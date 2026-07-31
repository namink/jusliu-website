<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  src: string
  show: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const videoRef = ref<HTMLVideoElement>()

function close() {
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(() => props.show, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    setTimeout(() => videoRef.value?.play(), 100)
  } else {
    document.body.style.overflow = ''
    if (videoRef.value) {
      videoRef.value.pause()
      videoRef.value.currentTime = 0
    }
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
        @click.self="close"
      >
        <button
          @click="close"
          class="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <video
          ref="videoRef"
          :src="src"
          controls
          playsinline
          class="max-w-[92vw] max-h-[88vh] rounded-lg shadow-2xl outline-none"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active video {
  transition: transform 0.3s ease;
}
.modal-enter-from video {
  transform: scale(0.92);
}
</style>
