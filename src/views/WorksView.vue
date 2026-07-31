<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { works, categories } from '@/data/works'
import WorkCard from '@/components/WorkCard.vue'
import { useScrollNav } from '@/composables/useScrollNav'
import { useI18n } from '@/composables/useI18n'

const emit = defineEmits<{
  particlePause: []
  particleResume: []
  previewImage: [src: string, alt: string]
}>()

const { t } = useI18n()

const route = useRoute()
const activeCategory = ref((route.query.category as string) || '')

watch(() => route.query.category, (val) => {
  activeCategory.value = (val as string) || ''
})

const allTabs = ['', ...categories]
const tabIdx = computed(() => allTabs.indexOf(activeCategory.value))

const currentPage = ref(1)
const perPage = 8

const filteredWorks = computed(() => {
  const list = activeCategory.value
    ? works.filter(w => w.category === activeCategory.value)
    : works
  return [...list].sort((a, b) => {
    if (a.videoUrl && !b.videoUrl) return -1
    if (!a.videoUrl && b.videoUrl) return 1
    return 0
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredWorks.value.length / perPage)))

const paginatedWorks = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredWorks.value.slice(start, start + perPage)
})

watch(activeCategory, () => { currentPage.value = 1 })

function goPage(page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function prevPage() { if (currentPage.value > 1) goPage(currentPage.value - 1) }
function nextPage() { if (currentPage.value < totalPages.value) goPage(currentPage.value + 1) }

useScrollNav(
  () => {
    if (tabIdx.value < allTabs.length - 1) {
      activeCategory.value = allTabs[tabIdx.value + 1]
      return true
    }
    return false
  },
  () => {
    if (tabIdx.value > 0) {
      activeCategory.value = allTabs[tabIdx.value - 1]
      return true
    }
    return false
  }
)
</script>

<template>
  <section class="min-h-screen w-full flex flex-col relative pb-20 md:pb-24">
    <div class="sticky top-12 z-20 pt-4 pb-2 md:pt-6 md:pb-2 px-6 bg-[#0f0f1a]/80 backdrop-blur-md">
      <div class="w-full max-w-6xl mx-auto">
        <div class="text-center mb-5 md:mb-6">
          <p class="text-[10px] md:text-xs font-mono tracking-[0.3em] text-indigo-400/60 mb-1.5">{{ t('portfolio') }} / {{ t('portfolioSub') }}</p>
          <p class="text-[10px] md:text-xs text-white/25">{{ t('previewHint') }}</p>
        </div>

        <div class="flex justify-center gap-2 md:gap-3 pb-2 overflow-x-auto scrollbar-none">
          <button
            v-for="tab in allTabs"
            :key="tab"
            @click="activeCategory = tab"
            class="text-xs md:text-sm px-4 py-2 rounded-full border transition-all duration-200 active:scale-95 flex-shrink-0"
            :class="activeCategory === tab
              ? 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300'
              : 'bg-white/[0.02] border-white/[0.06] text-white/45 hover:border-white/15 hover:text-white/65'"
          >
            {{ tab || t('all') }}
          </button>
        </div>
      </div>
    </div>

    <div class="w-full max-w-6xl mx-auto mt-24 px-6 flex-1 flex flex-col justify-center" :style="{ minHeight: '520px' }">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <WorkCard
          v-for="(work, i) in paginatedWorks"
          :key="work.id"
          :work="work"
          :index="i"
          @particle-pause="emit('particlePause')"
          @particle-resume="emit('particleResume')"
          @preview-image="(src: string, alt: string) => emit('previewImage', src, alt)"
        />
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-1.5 mt-10 md:mt-14 pb-8">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button v-for="p in totalPages" :key="p" @click="goPage(p)"
          class="min-w-[32px] h-8 px-2 flex items-center justify-center rounded-lg border text-xs font-mono transition-all duration-200"
          :class="currentPage === p ? 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300' : 'border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/20'">
          {{ p }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
