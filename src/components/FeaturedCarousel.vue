<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { works } from '@/data/works'

const featured = computed(() =>
  works.filter(w =>
    w.category === '项目支持' ||
    w.id === 'node-editor' ||
    w.id === 'ai-platform'
  )
)

const current = ref(0)
const scrollRef = ref<HTMLDivElement>()
let timer = 0
const cardW = 272

function next() {
  current.value = (current.value + 1) % featured.value.length
  if (scrollRef.value) {
    scrollRef.value.scrollTo({ left: current.value * cardW, behavior: 'smooth' })
  }
}

onMounted(() => {
  timer = window.setInterval(next, 4000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="relative mx-auto">
    <div ref="scrollRef" class="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth">
      <div
        v-for="(w, i) in featured"
        :key="w.id"
        class="flex-shrink-0 w-[240px] md:w-[260px] snap-center rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] cursor-pointer"
        @click="current = i; scrollRef?.scrollTo({ left: i * cardW, behavior: 'smooth' })"
      >
        <div class="aspect-[16/9] overflow-hidden">
          <img v-if="w.thumbnail" :src="w.thumbnail" :alt="w.title" class="w-full h-full object-cover" loading="lazy" />
          <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f0f2e] to-[#13133a]">
            <svg class="w-6 h-6 text-white/10" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
        </div>
        <div class="p-3">
          <span class="text-[9px] md:text-[10px] font-mono tracking-wider text-indigo-400/70 uppercase">{{ w.category }}</span>
          <h4 class="text-xs md:text-sm font-medium text-white mt-1 leading-tight line-clamp-1">{{ w.title }}</h4>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-1.5 mt-3">
      <span
        v-for="(_w, i) in [...Array(Math.min(8, featured.length))]"
        :key="i"
        class="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
        :class="i === current % Math.min(8, featured.length) ? 'bg-indigo-400 w-4' : 'bg-white/15 hover:bg-white/30'"
        @click="current = i; scrollRef?.scrollTo({ left: i * cardW, behavior: 'smooth' })"
      />
    </div>
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
