<script setup lang="ts">
import type { Work } from '@/data/works'
import { ref } from 'vue'

const props = defineProps<{
  work: Work
  index: number
}>()

const emit = defineEmits<{
  particlePause: []
  particleResume: []
}>()

const playing = ref(false)
const videoRef = ref<HTMLVideoElement>()

function onPlay() {
  playing.value = true
  emit('particlePause')
  setTimeout(() => videoRef.value?.play(), 50)
}

function onVideoPause() {
  playing.value = false
  emit('particleResume')
}

function onVideoEnded() {
  playing.value = false
  emit('particleResume')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === ' ' || e.code === 'Space') {
    e.preventDefault()
    const v = videoRef.value
    if (!v) return
    if (v.paused) { v.play() } else { v.pause() }
  }
}

function onMouseLeave() {
  if (videoRef.value && !videoRef.value.paused) {
    videoRef.value.pause()
    playing.value = false
    emit('particleResume')
  }
}

const imgError = ref(false)
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-300 active:scale-[0.98] hover:-translate-y-2 cursor-pointer"
    :class="[
      props.work.videoUrl
        ? 'bg-white/[0.03] border border-indigo-400/15 hover:border-indigo-400/40 hover:shadow-[0_0_24px_rgba(200,162,255,0.15)] video-card-glow'
        : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_0_20px_rgba(136,168,255,0.1)]'
    ]"
    :style="{ transitionDelay: `${props.index * 60}ms` }"
    @mouseleave="onMouseLeave"
    @keydown="onKeydown"
  >
    <div class="aspect-[16/10] overflow-hidden relative">
      <video
        v-if="props.work.videoUrl && playing"
        ref="videoRef"
        :src="props.work.videoUrl"
        :poster="props.work.thumbnail"
        controls
        playsinline
        tabindex="0"
        class="w-full h-full object-contain bg-black/60 outline-none"
        @pause="onVideoPause"
        @ended="onVideoEnded"
      />

      <img
        v-else-if="props.work.thumbnail"
        :src="props.work.thumbnail"
        :alt="props.work.title"
        class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 bg-black/40"
        loading="lazy"
        @error="imgError = true"
      />

      <div
        v-else
        class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f2e] via-[#13133a] to-[#0a0a1f]"
      >
        <div class="relative mb-4">
          <svg class="w-10 h-10 md:w-12 md:h-12 text-indigo-400/15" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
            <circle cx="12" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
        <p class="text-sm md:text-base text-white/15 font-mono tracking-[0.3em] select-none">项目涉密</p>
        <p class="text-[10px] md:text-xs text-white/07 mt-2 tracking-wider select-none">敬请期待</p>
        <div class="mt-5 w-16 h-px bg-gradient-to-r from-transparent via-white/06 to-transparent" />
      </div>

      <div
        v-if="props.work.videoUrl && !playing && !imgError"
        class="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        @click.stop="onPlay"
      >
        <div class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-500/30 backdrop-blur-sm flex items-center justify-center border border-indigo-400/40 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_24px_rgba(99,102,241,0.3)]">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="p-4 md:p-5">
      <div class="flex items-center gap-2">
        <span class="text-[10px] md:text-xs font-mono tracking-widest text-indigo-400/80 uppercase">
          {{ props.work.category }}
        </span>
        <span
          v-if="props.work.videoUrl"
          class="text-[10px] text-indigo-400/70 border border-indigo-400/25 rounded px-1.5 py-px animate-pulse"
        >
          VIDEO
        </span>
        <span
          v-if="!props.work.thumbnail"
          class="text-[10px] text-amber-500/50 border border-amber-500/20 rounded px-1.5 py-px"
        >
          NDA
        </span>
      </div>
      <h3 class="text-sm md:text-base font-medium text-white mt-1.5 mb-2">{{ props.work.title }}</h3>
      <p class="text-xs md:text-sm text-white/50 leading-relaxed line-clamp-2">{{ props.work.description }}</p>
      <div class="flex flex-wrap gap-1.5 mt-3">
        <span
          v-for="tag in props.work.tags"
          :key="tag"
          class="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.06]"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
