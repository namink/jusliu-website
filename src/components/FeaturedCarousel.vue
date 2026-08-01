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

const looped = computed(() => [...featured.value, ...featured.value, ...featured.value])
const nezhaIdx = computed(() => {
  const idx = featured.value.findIndex(w => w.id === 'nezha')
  return idx >= 0 ? idx : 0
})

const trackRef = ref<HTMLDivElement>()
const paused = ref(false)
const dragging = ref(false)
let rafId = 0, offset = 0, startX = 0, startTx = 0
const MAX_SPEED = 0.6
let currentSpeed = 0
let velocity = 0, prevX = 0
let momentumRaf = 0

function tick() {
  const el = trackRef.value
  if (!el) { rafId = requestAnimationFrame(tick); return }
  if (!paused.value && !dragging.value) {
    if (currentSpeed < MAX_SPEED) currentSpeed = Math.min(MAX_SPEED, currentSpeed + 0.02)
    offset -= currentSpeed
    const thirdW = el.scrollWidth / 3
    while (offset < -2 * thirdW) offset += thirdW
    while (offset > 0) offset -= thirdW
    el.style.transform = `translateX(${offset}px)`
  }
  rafId = requestAnimationFrame(tick)
}

function onDown(e: MouseEvent) {
  dragging.value = true; paused.value = true; currentSpeed = 0
  cancelAnimationFrame(momentumRaf)
  startX = e.clientX; prevX = e.clientX
  if (trackRef.value) {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(trackRef.value).transform)
    startTx = matrix.m41
  }
}
function onMove(e: MouseEvent) {
  if (!dragging.value) return
  offset = startTx + (e.clientX - startX) * 3
  velocity = prevX - e.clientX
  prevX = e.clientX
  if (trackRef.value) trackRef.value.style.transform = `translateX(${offset}px)`
}
function onUp() {
  dragging.value = false
  if (!trackRef.value) return
  const m = new DOMMatrixReadOnly(getComputedStyle(trackRef.value).transform)
  offset = m.m41
  // Momentum inertia
  function momentum() {
    if (Math.abs(velocity) < 0.1 || dragging.value) {
      const el = trackRef.value; if (!el) return
      const m2 = new DOMMatrixReadOnly(getComputedStyle(el).transform)
      offset = m2.m41
      const thirdW = el.scrollWidth / 3
      while (offset < -2 * thirdW) offset += thirdW
      while (offset > 0) offset -= thirdW
      el.style.transform = `translateX(${offset}px)`
      currentSpeed = MAX_SPEED
      paused.value = false
      return
    }
    offset += velocity
    velocity *= 0.94
    if (trackRef.value) {
      const thirdW = trackRef.value.scrollWidth / 3
      while (offset < -2 * thirdW) offset += thirdW
      while (offset > 0) offset -= thirdW
      trackRef.value.style.transform = `translateX(${offset}px)`
    }
    momentumRaf = requestAnimationFrame(momentum)
  }
  momentum()
}
function onEnter() { paused.value = true }
function onLeave() { if (!dragging.value) paused.value = false }

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  // Center on Nezha
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const el = trackRef.value; if (!el) return
    const parentW = el.parentElement?.clientWidth ?? window.innerWidth
    const cardW = el.firstElementChild?.clientWidth ?? 300
    const gapW = 8
    const target = cardW * nezhaIdx.value + gapW * nezhaIdx.value + cardW / 2
    const thirdW = el.scrollWidth / 3
    offset = -(target - parentW / 2) - thirdW
    el.style.transform = `translateX(${offset}px)`
  }))
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  cancelAnimationFrame(momentumRaf)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', onUp)
})
</script>

<template>
  <div class="relative w-full">
    <div class="film-reel relative rounded-2xl overflow-hidden border-t-[6px] border-b-[6px] border-x-[4px] border-indigo-400/[0.08] shadow-[inset_0_4px_12px_rgba(0,0,0,0.25)]" @mouseenter="onEnter" @mouseleave="onLeave">
      <div ref="trackRef" class="flex gap-2 py-3" @mousedown.prevent="onDown" style="cursor:grab; will-change: transform;">
        <div
          v-for="(w, i) in looped"
          :key="`${w.id}-${i}`"
          class="film-frame flex-shrink-0 w-[44vw] md:w-[40vw] overflow-hidden select-none flex flex-col relative"
          style="background: linear-gradient(135deg, rgba(15,15,26,0.95), rgba(20,18,40,0.95));"
        >
          <div class="film-sprocket-top" />
          <div class="aspect-[16/9] overflow-hidden relative mx-[6px]">
            <img v-if="w.thumbnail" :src="w.thumbnail" :alt="w.title" class="w-full h-full object-cover pointer-events-none" loading="lazy" />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f0f2e] to-[#13133a]">
              <svg class="w-6 h-6 text-white/10" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/60 to-transparent pointer-events-none" />
          </div>
          <div class="p-3 md:p-4 h-[60px] md:h-[68px] flex flex-col items-center justify-center">
            <span class="text-[9px] md:text-[10px] font-mono tracking-wider text-indigo-400/60 uppercase text-center">{{ w.category }}</span>
            <h4 class="text-xs md:text-base font-medium text-white/80 mt-1.5 leading-tight line-clamp-1 text-center">{{ w.title }}</h4>
          </div>
          <div class="film-sprocket-bottom" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.film-sprocket-top,
.film-sprocket-bottom {
  height: 8px;
  position: relative;
  z-index: 2;
}
.film-sprocket-top {
  background: repeating-linear-gradient(90deg,
    #0f0f1a 0, #0f0f1a 5px,
    rgba(200,162,255,0.2) 5px, rgba(200,162,255,0.2) 11px,
    #0f0f1a 11px, #0f0f1a 18px);
}
.film-sprocket-bottom {
  background: repeating-linear-gradient(90deg,
    #0f0f1a 0, #0f0f1a 5px,
    rgba(200,162,255,0.2) 5px, rgba(200,162,255,0.2) 11px,
    #0f0f1a 11px, #0f0f1a 18px);
}
</style>
