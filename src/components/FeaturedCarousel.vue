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
const trackRef = ref<HTMLDivElement>()
const paused = ref(false)
const dragging = ref(false)
let startX = 0, startTx = 0, currentTx = 0

function onDown(e: MouseEvent) {
  dragging.value = true; paused.value = true
  startX = e.clientX; startTx = currentTx
}
function onMove(e: MouseEvent) {
  if (!dragging.value || !trackRef.value) return
  const delta = e.clientX - startX
  currentTx = startTx + delta
  trackRef.value.style.transform = `translateX(${currentTx}px)`
  trackRef.value.style.animation = 'none'
}
function onUp() {
  if (!trackRef.value) return
  dragging.value = false; paused.value = false
  const halfW = trackRef.value.scrollWidth / 2
  currentTx = currentTx % halfW; if (currentTx > 0) currentTx -= halfW
}
function onEnter() { if (!dragging.value) paused.value = true }
function onLeave() { if (!dragging.value) paused.value = false }

onMounted(() => { window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp) })
onUnmounted(() => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) })
</script>

<template>
  <div class="relative w-full overflow-hidden px-[2vw]" @mouseenter="onEnter" @mouseleave="onLeave">
    <div ref="trackRef" class="flex gap-4 carousel-track animate-scroll" :class="{ '[animation-play-state:paused]': paused }" @mousedown.prevent="onDown" style="cursor:grab">
      <div v-for="(w, i) in looped" :key="`${w.id}-${i}`" class="flex-shrink-0 w-[42vw] md:w-[38vw] rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] select-none">
        <div class="aspect-[16/9] overflow-hidden">
          <img v-if="w.thumbnail" :src="w.thumbnail" :alt="w.title" class="w-full h-full object-cover pointer-events-none" loading="lazy" />
          <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f0f2e] to-[#13133a]">
            <svg class="w-6 h-6 text-white/10" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
        </div>
        <div class="p-3 md:p-4">
          <span class="text-[9px] md:text-[10px] font-mono tracking-wider text-indigo-400/70 uppercase">{{ w.category }}</span>
          <h4 class="text-xs md:text-base font-medium text-white mt-1.5 leading-tight line-clamp-1">{{ w.title }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes carouselScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.animate-scroll { animation: carouselScroll 60s linear infinite; }
.carousel-track { will-change: transform; }
</style>
