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

const trackRef = ref<HTMLDivElement>()
const paused = ref(false)
const dragging = ref(false)
let startX = 0, startTx = 0, currentTx = 0

function onDown(e: MouseEvent) {
  dragging.value = true; paused.value = true
  startX = e.clientX
  if (trackRef.value) {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(trackRef.value).transform)
    startTx = matrix.m41
    currentTx = startTx
  }
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
  if (!trackRef.value) { paused.value = false; return }
  const el = trackRef.value
  const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform)
  currentTx = matrix.m41
  const halfW = el.scrollWidth / 2
  currentTx = ((currentTx % halfW) + halfW) % halfW - halfW / 2
  const delay = halfW > 0 ? (30 * currentTx) / halfW : 0
  el.style.animation = 'none'
  el.style.transform = `translateX(${currentTx}px)`
  requestAnimationFrame(() => {
    el.style.animation = 'carouselScroll 30s linear infinite'
    el.style.animationDelay = `${delay}s`
    requestAnimationFrame(() => {
      el.style.transform = ''
      paused.value = false
    })
  })
}
function onEnter() { if (!dragging.value) paused.value = true }
function onLeave() { if (!dragging.value) paused.value = false }

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)

  // Snap Nezha to center, then start CSS animation
  setTimeout(() => {
    const el = trackRef.value
    if (!el) return
    const parentW = el.parentElement?.clientWidth ?? window.innerWidth
    const center = parentW / 2
    const cardW = el.firstElementChild?.clientWidth ?? 300
    const gapW = 8 // gap-2 = 0.5rem = 8px
    const target = cardW * nezhaIdx.value + gapW * nezhaIdx.value + cardW / 2
    el.style.transition = 'none'
    el.style.animation = 'none'
    el.style.transform = `translateX(${-(target - center)}px)`
    currentTx = -(target - center)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!el) return
        el.style.transform = ''
        el.style.animation = ''
        el.style.transition = ''
      })
    })
  }, 200)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', onUp)
})
</script>

<template>
  <div class="relative w-full">
    <div class="film-reel relative rounded-2xl overflow-hidden border-t-[4px] border-b-[4px] border-x-[4px] border-white/[0.06] shadow-[inset_0_4px_12px_rgba(0,0,0,0.2)]" @mouseenter="onEnter" @mouseleave="onLeave">
      <div class="absolute top-0 left-1 right-1 h-[4px] z-10 opacity-80" style="background: repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(200,162,255,0.3) 6px, rgba(200,162,255,0.3) 12px);" />
      <div class="absolute bottom-0 left-1 right-1 h-[4px] z-10 opacity-80" style="background: repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(200,162,255,0.3) 6px, rgba(200,162,255,0.3) 12px);" />

      <div ref="trackRef" class="flex gap-2 carousel-track py-3" :class="{ '[animation-play-state:paused]': paused }" @mousedown.prevent="onDown" style="cursor:grab">
        <div
          v-for="(w, i) in looped"
          :key="`${w.id}-${i}`"
          class="film-frame flex-shrink-0 w-[44vw] md:w-[40vw] rounded-xl overflow-hidden border-x border-indigo-400/[0.06] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(200,162,255,0.12)] select-none"
          style="background: linear-gradient(to bottom, rgba(15,15,26,0.3), rgba(15,15,26,0.5));"
        >
          <div class="aspect-[16/9] overflow-hidden relative">
            <img v-if="w.thumbnail" :src="w.thumbnail" :alt="w.title" class="w-full h-full object-cover pointer-events-none" loading="lazy" />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f0f2e] to-[#13133a]">
              <svg class="w-6 h-6 text-white/10" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/60 to-transparent pointer-events-none" />
          </div>
          <div class="p-3 md:p-4 border-t border-white/[0.04] flex flex-col justify-center min-h-[72px] md:min-h-[80px]">
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
