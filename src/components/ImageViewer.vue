<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { useMotion } from '@/composables/useMotion'
import { useI18n } from '@/composables/useI18n'
const props = defineProps<{ src: string; alt: string; show: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const { reducedMotion } = useMotion()
const dialog = ref<HTMLDialogElement>()
const image = ref<HTMLImageElement>()
let returnFocus: HTMLElement | null = null
let previousOverflow = ''
let closing = false
let generation = 0
let sourceRect: DOMRect | null = null
function requestClose() {
  if (closing) return
  closing = true
  if (!reducedMotion.value && image.value && sourceRect && returnFocus?.isConnected) {
    gsap.killTweensOf(image.value)
    const rect = image.value.getBoundingClientRect()
    if (!rect.width || !rect.height) { emit('close'); return }
    gsap.to(image.value, { x: sourceRect.left + sourceRect.width / 2 - rect.left - rect.width / 2, y: sourceRect.top + sourceRect.height / 2 - rect.top - rect.height / 2, scaleX: sourceRect.width / rect.width, scaleY: sourceRect.height / rect.height, opacity: 0, duration: .18, ease: 'power2.in', onComplete: () => emit('close') })
  } else emit('close')
}
watch(() => props.show, async show => {
  const run = ++generation
  if (show) {
    closing = false
    returnFocus = document.activeElement as HTMLElement
    sourceRect = returnFocus?.querySelector('img')?.getBoundingClientRect() || null
    previousOverflow = document.body.style.overflow
    dialog.value?.showModal()
    document.body.style.overflow = 'hidden'
    await nextTick()
    try { await image.value?.decode() } catch { /* The image element still exposes its normal failure state. */ }
    if (run !== generation || !props.show || closing || !image.value || reducedMotion.value) return
    const rect = image.value.getBoundingClientRect()
    gsap.fromTo(image.value, { x: sourceRect ? sourceRect.left + sourceRect.width / 2 - rect.left - rect.width / 2 : 0, y: sourceRect ? sourceRect.top + sourceRect.height / 2 - rect.top - rect.height / 2 : 0, scaleX: sourceRect ? sourceRect.width / Math.max(1,rect.width) : .97, scaleY: sourceRect ? sourceRect.height / Math.max(1,rect.height) : .97, opacity: .4 }, { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: .3, ease: 'power3.out', overwrite: true })
  } else {
    if (image.value) gsap.killTweensOf(image.value)
    dialog.value?.close()
    document.body.style.overflow = previousOverflow
    returnFocus?.focus()
    closing = false
  }
}, { flush: 'post' })
onBeforeUnmount(() => { generation++; if (image.value) gsap.killTweensOf(image.value); document.body.style.overflow = previousOverflow })
</script>
<template>
  <Teleport to="body">
    <dialog ref="dialog" class="image-dialog" :aria-label="alt" @cancel.prevent="requestClose" @click="($event.target === dialog) && requestClose()">
      <button type="button" class="viewer-close" :aria-label="t('closePreview')" @click="requestClose" autofocus><svg aria-hidden="true" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
      <figure><img v-if="show" ref="image" :src="src" :alt="alt" /><figcaption>{{ alt }} <a :href="src" target="_blank" rel="noopener noreferrer">{{ t('openImage') }} ↗</a></figcaption></figure>
    </dialog>
  </Teleport>
</template>
