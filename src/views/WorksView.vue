<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { works, categories } from '@/data/works'
import WorkCard from '@/components/WorkCard.vue'
import { useScrollNav } from '@/composables/useScrollNav'

const emit = defineEmits<{
  particlePause: []
  particleResume: []
}>()

const route = useRoute()
const activeCategory = ref((route.query.category as string) || '')

watch(() => route.query.category, (val) => {
  activeCategory.value = (val as string) || ''
})

const currentPage = ref(1)
const perPage = 9

const filteredWorks = computed(() => {
  const list = activeCategory.value
    ? works.filter(w => w.category === activeCategory.value)
    : works
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredWorks.value.length / perPage)))

const paginatedWorks = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredWorks.value.slice(start, start + perPage)
})

watch(activeCategory, () => {
  currentPage.value = 1
})

function goPage(page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function prevPage() {
  if (currentPage.value > 1) goPage(currentPage.value - 1)
}

function nextPage() {
  if (currentPage.value < totalPages.value) goPage(currentPage.value + 1)
}

const allTabs = ['', ...categories]
const tabIdx = computed(() => allTabs.indexOf(activeCategory.value))

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
  <section class="min-h-screen w-full flex flex-col items-center justify-center relative px-6 py-20 md:py-24">
    <div class="w-full max-w-6xl mx-auto">
      <div class="text-center mb-12 md:mb-16">
        <p class="text-xs md:text-sm font-mono tracking-[0.3em] text-indigo-400 mb-4">PORTFOLIO</p>
        <h2 class="text-3xl md:text-5xl font-bold text-white">作品集</h2>
        <p class="text-sm md:text-base text-white/40 mt-4">滚轮切换分类 · 点击带 VIDEO 标识的卡片可直接播放演示</p>
      </div>

      <div class="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
        <button
          v-for="(tab, ti) in allTabs"
          :key="ti"
          @click="activeCategory = tab"
          class="text-xs md:text-sm px-4 py-2 rounded-full border transition-all duration-300"
          :class="activeCategory === tab
            ? 'bg-indigo-500/20 border-indigo-400/40 text-indigo-300'
            : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/20 hover:text-white/70'"
        >
          {{ tab || '全部' }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <WorkCard
          v-for="(work, i) in paginatedWorks"
          :key="work.id"
          :work="work"
          :index="i"
          @particle-pause="emit('particlePause')"
          @particle-resume="emit('particleResume')"
        />
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-1.5 mt-10 md:mt-14">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          v-for="p in totalPages"
          :key="p"
          @click="goPage(p)"
          class="min-w-[32px] h-8 px-2 flex items-center justify-center rounded-lg border text-xs font-mono transition-all duration-200"
          :class="currentPage === p
            ? 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300'
            : 'border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/20'"
        >
          {{ p }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>
