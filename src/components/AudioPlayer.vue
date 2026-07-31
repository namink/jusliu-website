<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
    class="fixed bottom-6 left-6 z-50 w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm text-white/40 hover:text-white/70 hover:border-white/15 transition-all duration-200"
    :title="playing ? '暂停音乐' : '播放音乐'"
  >
    <span class="text-sm">{{ playing ? '🔊' : '🔇' }}</span>
  </button>
</template>
