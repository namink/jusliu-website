<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const bgmUrl = 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/audio/bgm.mp3'
const audio = new Audio(bgmUrl)
audio.loop = true
audio.volume = 0.15

const playing = ref(localStorage.getItem('bgm-playing') === '1')

onMounted(() => {
  if (playing.value) {
    audio.play().catch(() => playing.value = false)
  }
})

function toggle() {
  if (playing.value) {
    audio.pause()
    playing.value = false
  } else {
    audio.play().catch(() => {})
    playing.value = true
  }
  localStorage.setItem('bgm-playing', playing.value ? '1' : '0')
}
</script>

<template>
  <button
    @click="toggle"
    class="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15]"
    :class="playing ? 'bg-white/[0.04] border-white/[0.10] text-white/50 hover:text-white/65' : 'bg-white/[0.02] border-white/[0.04] text-white/30 hover:text-white/45'"
    :title="playing ? t('audioPause') : t('audioPlay')"
  >
    <svg class="w-3.5 h-3.5" :class="playing ? 'opacity-60' : 'opacity-30'" fill="currentColor" viewBox="0 0 24 24">
      <template v-if="playing">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </template>
      <template v-else>
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </template>
    </svg>
    <span class="text-[10px] font-mono tracking-wider hidden md:inline">{{ playing ? t('audioOn') : t('audioOff') }}</span>
  </button>
</template>
