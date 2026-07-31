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

const allTabs = ['', ...categories]
const tabIdx = computed(() => allTabs.indexOf(activeCategory.value))

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
  <section class="min-h-screen w-full relative pb-20 md:pb-24">
    <div class="sticky top-0 z-20 pt-6 pb-3 md:pt-8 md:pb-4 px-6 bg-[#0f0f1a]/80 backdrop-blur-md">
      <div class="w-full max-w-6xl mx-auto">
        <div class="text-center mb-5 md:mb-6">
          <p class="text-[10px] md:text-xs font-mono tracking-[0.3em] text-indigo-400/60 mb-1.5">PORTFOLIO / 作品集</p>
          <p class="text-[10px] md:text-xs text-white/25">滚轮切分类 · 点击卡片播放 · 左右滑动浏览</p>
        </div>

        <div class="flex justify-center gap-2 md:gap-3 pb-2 overflow-x-auto scrollbar-none">
          <button
            v-for="(tab, ti) in allTabs"
            :key="ti"
            @click="activeCategory = tab"
            class="text-xs md:text-sm px-4 py-2 rounded-full border transition-all duration-200 active:scale-95 flex-shrink-0"
            :class="activeCategory === tab
              ? 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300'
              : 'bg-white/[0.02] border-white/[0.06] text-white/45 hover:border-white/15 hover:text-white/65'"
          >
            {{ tab || '全部' }}
          </button>
        </div>
      </div>
    </div>

    <div class="w-full max-w-6xl mx-auto mt-8 md:mt-10 px-6" :style="{ minHeight: '600px' }">
      <div class="flex overflow-x-auto gap-4 md:gap-5 snap-x snap-mandatory pb-4 scrollbar-none">
        <WorkCard
          v-for="(work, i) in filteredWorks"
          :key="work.id"
          :work="work"
          :index="i"
          class="flex-shrink-0 w-[300px] md:w-[360px] snap-start"
          @particle-pause="emit('particlePause')"
          @particle-resume="emit('particleResume')"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
