<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useI18n } from '@/composables/useI18n'
const props = defineProps<{ src: string; alt: string; show: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const dialog = ref<HTMLDialogElement>()
let returnFocus: HTMLElement | null = null
let previousOverflow = ''
function close() { emit('close') }
watch(() => props.show, show => {
  if (show) {
    returnFocus = document.activeElement as HTMLElement
    previousOverflow = document.body.style.overflow
    dialog.value?.showModal()
    document.body.style.overflow = 'hidden'
  } else {
    dialog.value?.close()
    document.body.style.overflow = previousOverflow
    returnFocus?.focus()
  }
}, { flush: 'post' })
onBeforeUnmount(() => { document.body.style.overflow = previousOverflow })
</script>
<template>
  <Teleport to="body">
    <dialog ref="dialog" class="image-dialog" :aria-label="alt" @cancel.prevent="close" @click="($event.target === dialog) && close()">
      <button type="button" class="viewer-close" :aria-label="t('closePreview')" @click="close" autofocus>
        <svg aria-hidden="true" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
      <figure><img v-if="show" :src="src" :alt="alt" /><figcaption>{{ alt }}</figcaption></figure>
    </dialog>
  </Teleport>
</template>
