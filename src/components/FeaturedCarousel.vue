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

const nezhaIdx = computed(() => {
  const idx = featured.value.findIndex(w => w.id === 'nezha')
  return idx >= 0 ? idx : 0
})

const nezhaDelay = computed(() => {
  const total = featured.value.length || 1
  return `-${30 * nezhaIdx.value / total}s`
})

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
  dragging.value = false
  if (!trackRef.value) return
  const halfW = trackRef.value.scrollWidth / 2
  currentTx = ((currentTx % halfW) + halfW) % halfW - halfW / 2
  const delay = (30 * currentTx) / halfW
  trackRef.value.style.animation = 'none'
  trackRef.value.style.transform = `translateX(${currentTx}px)`
  requestAnimationFrame(() => {
    if (!trackRef.value) return
    trackRef.value.style.animation = 'carouselScroll 30s linear infinite'
    trackRef.value.style.animationDelay = `${delay}s`
    trackRef.value.style.transform = ''
    paused.value = false
  })
}
function onEnter() { if (!dragging.value) paused.value = true }
function onLeave() { if (!dragging.value) paused.value = false }

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', onUp)
})
</script>

<template>
  <div class="relative w-full">
    <div class="film-reel relative rounded-2xl overflow-hidden border-t-[4px] border-b-[4px] border-white/[0.06] shadow-[inset_0_4px_12px_rgba(0,0,0,0.2)]" @mouseenter="onEnter" @mouseleave="onLeave">
      <div class="absolute top-0 left-2 right-2 h-[4px] z-10 opacity-60" style="background: repeating-linear-gradient(90deg, transparent 0, transparent 10px, rgba(200,162,255,0.25) 10px, rgba(200,162,255,0.25) 16px);" />
      <div class="absolute bottom-0 left-2 right-2 h-[4px] z-10 opacity-60" style="background: repeating-linear-gradient(90deg, transparent 0, transparent 10px, rgba(200,162,255,0.25) 10px, rgba(200,162,255,0.25) 16px);" />

    <div ref="trackRef" class="flex gap-2 carousel-track py-3" :class="{ '[animation-play-state:paused]': paused }" :style="{ animationDelay: nezhaDelay }" @mousedown.prevent="onDown" style="cursor:grab">
        <div
          v-for="(w, i) in looped"
          :key="`${w.id}-${i}`"
          class="film-frame flex-shrink-0 w-[42vw] md:w-[38vw] overflow-hidden bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04] select-none border-x border-white/[0.04]"
        >
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
  </div>
</template>

<style scoped>
@keyframes carouselScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.carousel-track { will-change: transform; animation: carouselScroll 30s linear infinite; }
</style>
