<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { works } from '@/data/works'

const featured = computed(() =>
  works.filter(w =>
    w.category === '项目支持' ||
    w.id === 'node-editor' ||
    w.id === 'ai-platform'
  )
)

const looped = computed(() => [...featured.value, ...featured.value])

const scrollRef = ref<HTMLDivElement>()
const hovered = ref(false)
const dragging = ref(false)
let raf = 0
let dragStartX = 0
let dragScrollStart = 0
const SPEED = 0.35

function tick() {
  const el = scrollRef.value
  if (!el) { raf = requestAnimationFrame(tick); return }
  if (el.scrollWidth <= el.clientWidth + 10) { raf = requestAnimationFrame(tick); return }
  if (!hovered.value && !dragging.value) {
    el.scrollLeft += SPEED
    if (el.scrollLeft >= el.scrollWidth / 2 + 5) {
      el.scrollLeft -= el.scrollWidth / 2
    }
  }
  raf = requestAnimationFrame(tick)
}

function onDown(e: MouseEvent) {
  dragging.value = true
  dragStartX = e.clientX
  dragScrollStart = scrollRef.value?.scrollLeft ?? 0
  if (scrollRef.value) scrollRef.value.style.cursor = 'grabbing'
}

function onMove(e: MouseEvent) {
  if (!dragging.value || !scrollRef.value) return
  scrollRef.value.scrollLeft = dragScrollStart + (dragStartX - e.clientX)
}

function onUp() {
  dragging.value = false
  if (scrollRef.value) scrollRef.value.style.cursor = 'grab'
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', onUp)
})
</script>

<template>
  <div
    class="relative max-w-5xl mx-auto"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div
      ref="scrollRef"
      class="flex gap-3 overflow-x-auto scrollbar-none"
      style="cursor:grab"
      @mousedown.prevent="onDown"
    >
      <div
        v-for="(w, i) in looped"
        :key="`${w.id}-${i}`"
        class="flex-shrink-0 w-[200px] md:w-[220px] rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12]"
      >
        <div class="aspect-[16/9] overflow-hidden">
          <img v-if="w.thumbnail" :src="w.thumbnail" :alt="w.title" class="w-full h-full object-cover pointer-events-none" loading="lazy" />
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
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
