<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  show: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function close() { emit('close') }

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(() => props.show, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
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
        <img
          :src="src"
          :alt="alt"
          class="max-w-[92vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          style="cursor: default;"
        />
        <p class="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 font-medium">{{ alt }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
