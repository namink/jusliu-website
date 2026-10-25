<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { works } from '@/data/works'
import { integrateMomentum } from '@/data/motionMath'
import { localizeWork } from '@/data/workContent'
import { useMotion } from '@/composables/useMotion'
import { useI18n } from '@/composables/useI18n'
const { reducedMotion, documentHidden } = useMotion()
const { t, locale } = useI18n()
const featured = computed(() => works.filter(w => w.category === 'AIGC' || w.category === '项目支持' || w.id === 'node-editor' || w.id === 'ai-platform').map(w => localizeWork(w, locale.value)))
const looped = computed(() => [...featured.value, ...featured.value, ...featured.value])
const centerIndex = featured.value.findIndex(w => w.id === 'nezha')
const track = ref<HTMLDivElement>()
const viewport = ref<HTMLDivElement>()
const dragging = ref(false)
const hovered = ref(false)
const focused = ref(false)
const inView = ref(true)
let offset = 0, period = 0, frame = 0, lastTime = 0, velocity = 0
let down: { x: number; y: number; offset: number; time: number; lastX: number; pointerId: number } | null = null
let moved = false
let resize: ResizeObserver | undefined
let visibility: IntersectionObserver | undefined
function render() {
  if (!track.value || period <= 0) return
  while (offset < -2 * period) offset += period
  while (offset > 0) offset -= period
  track.value.style.transform = `translate3d(${offset}px,0,0)`
}
function shouldRun() {
  return !documentHidden.value && inView.value && !reducedMotion.value && !dragging.value && (Math.abs(velocity) > 3 || (!hovered.value && !focused.value))
}
function tick(time: number) {
  frame = 0
  const dt = lastTime ? Math.min(time - lastTime, 40) : 0
  lastTime = time
  if (!shouldRun()) { lastTime = 0; return }
  if (Math.abs(velocity) > 3) { const momentum = integrateMomentum(velocity, dt); offset += momentum.distance; velocity = momentum.velocity }
  else { velocity = 0; offset -= 36 * dt / 1000 }
  render()
  frame = requestAnimationFrame(tick)
}
function schedule() {
  if (!shouldRun()) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; return }
  if (!frame) frame = requestAnimationFrame(tick)
}
watch([reducedMotion, documentHidden, inView, hovered, focused, dragging], () => { if (reducedMotion.value) velocity = 0; schedule() })
function pointerDown(event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0) return
  moved = false; velocity = 0
  down = { x: event.clientX, y: event.clientY, offset, time: event.timeStamp, lastX: event.clientX, pointerId: event.pointerId }
}
function pointerMove(event: PointerEvent) {
  if (!down) return
  const dx = event.clientX - down.x, dy = event.clientY - down.y
  if (!dragging.value) {
    if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { down = null; return }
    if (Math.abs(dx) < 6) return
    dragging.value = true; moved = true
    track.value?.setPointerCapture(event.pointerId)
  }
  offset = down.offset + dx
  const elapsed = event.timeStamp - down.time
  if (elapsed > 0) velocity = (event.clientX - down.lastX) / elapsed * 1000
  down.lastX = event.clientX; down.time = event.timeStamp
  render()
}
function pointerUp(event: PointerEvent) {
  if (!down) return
  if (event.timeStamp - down.time > 100 || reducedMotion.value) velocity = 0
  down = null
  if (track.value?.hasPointerCapture(event.pointerId)) track.value.releasePointerCapture(event.pointerId)
  dragging.value = false
  schedule()
}
function cancelPointer() { down = null; velocity = 0; dragging.value = false; schedule() }
function onClick(event: MouseEvent) {
  if (moved) { event.preventDefault(); event.stopPropagation(); moved = false }
}
function focusWork(event: FocusEvent, index: number) {
  if (!(event.target as HTMLElement).matches(':focus-visible')) return
  const card = track.value?.firstElementChild?.clientWidth || 300
  offset = -index * (card + 8) + (viewport.value?.clientWidth || 0) / 2 - card / 2
  velocity = 0; render()
}
function step(direction: number) {
  velocity = 0
  offset -= direction * ((track.value?.firstElementChild?.clientWidth || 300) + 8)
  render()
}
onMounted(() => {
  resize = new ResizeObserver(() => {
    const el = track.value
    if (!el) return
    const next = el.scrollWidth / 3
    if (!next) return
    if (period) offset *= next / period
    else offset = -next - Math.max(0, centerIndex) * ((el.firstElementChild?.clientWidth || 300) + 8) + (viewport.value?.clientWidth || 0) / 2 - (el.firstElementChild?.clientWidth || 300) / 2
    period = next; render(); schedule()
  })
  if (viewport.value) {
    resize.observe(viewport.value)
    visibility = new IntersectionObserver(entries => { inView.value = !!entries[0]?.isIntersecting })
    visibility.observe(viewport.value)
  }
})
onBeforeUnmount(() => { cancelAnimationFrame(frame); resize?.disconnect(); visibility?.disconnect() })
</script>
<template>
  <div class="featured-reel relative w-full" @focusin="focused = true" @focusout="focused = !!($event.relatedTarget && $el.contains($event.relatedTarget))">
    <div ref="viewport" class="film-reel relative rounded-2xl overflow-hidden border-t-[6px] border-b-[6px] border-x-[4px] border-indigo-400/[0.08]" @mouseenter="hovered = true" @mouseleave="hovered = false">
      <div ref="track" :class="['reel-track flex gap-2 py-3', { dragging }]" @pointerdown="pointerDown" @pointermove="pointerMove" @pointerup="pointerUp" @pointercancel="cancelPointer" @click.capture="onClick">
        <RouterLink v-for="(work, i) in looped" :key="`${work.id}-${i}`" :to="{ name: 'work-detail', params: { id: work.id } }"
          :aria-hidden="i < featured.length || i >= featured.length * 2" :tabindex="i < featured.length || i >= featured.length * 2 ? -1 : 0"
          :aria-label="`${t('viewProject')}: ${work.title}`" draggable="false"
          @focus="focusWork($event,i)" class="film-frame flex-shrink-0 w-[78vw] md:w-[40vw] overflow-hidden select-none flex flex-col relative" @dragstart.prevent>
          <div class="film-sprocket-top" />
          <div class="aspect-[16/9] overflow-hidden relative mx-[6px]">
            <img :src="work.thumbnail" :alt="work.title" width="960" height="540" decoding="async" draggable="false" class="w-full h-full object-cover pointer-events-none"
              :loading="Math.abs(i - (featured.length + centerIndex)) <= 1 ? 'eager' : 'lazy'" :fetchpriority="i === featured.length + centerIndex ? 'high' : 'auto'" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#111315]/60 to-transparent pointer-events-none" />
          </div>
          <div class="p-3 md:p-4 h-[72px] md:h-[80px] flex flex-col items-center justify-center">
            <span class="text-[9px] md:text-[10px] tracking-wider text-indigo-200/80 text-center">{{ work.category }}</span>
            <h2 class="text-xs md:text-base font-medium text-white/80 mt-1 leading-tight line-clamp-1 text-center">{{ work.title }}</h2>
          </div>
          <div class="film-sprocket-bottom" />
        </RouterLink>
      </div>
    </div>
    <div class="reel-controls">
      <button type="button" :aria-label="t('previousWork')" @click="step(-1)"><svg aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg></button>
      <button type="button" :aria-label="t('nextWork')" @click="step(1)"><svg aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
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
    #111315 0, #111315 5px,
    rgba(196,179,147,0.2) 5px, rgba(196,179,147,0.2) 11px,
    #111315 11px, #111315 18px);
}
.film-sprocket-bottom {
  background: repeating-linear-gradient(90deg,
    #111315 0, #111315 5px,
    rgba(196,179,147,0.2) 5px, rgba(196,179,147,0.2) 11px,
    #111315 11px, #111315 18px);
}
</style>
