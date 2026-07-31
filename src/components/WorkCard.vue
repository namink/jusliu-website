<script setup lang="ts">
import type { Work } from '@/data/works'
import { ref } from 'vue'

const props = defineProps<{
  work: Work
  index: number
}>()

const imgError = ref(false)
const playing = ref(false)
const videoRef = ref<HTMLVideoElement>()

function onPlay() {
  playing.value = true
  setTimeout(() => videoRef.value?.play(), 50)
}

function onPause() {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
    playing.value = false
  }
}
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
    :class="[
      props.work.videoUrl
        ? 'bg-white/[0.03] border border-indigo-400/15 hover:border-indigo-400/35 video-card-glow'
        : 'bg-white/[0.03] border border-white/[0.06] hover:border-indigo-400/30'
    ]"
    :style="{ transitionDelay: `${props.index * 60}ms` }"
  >
    <div class="aspect-[16/10] overflow-hidden relative">
      <video
        v-if="props.work.videoUrl && playing"
        ref="videoRef"
        :src="props.work.videoUrl"
        :poster="props.work.thumbnail"
        controls
        playsinline
        class="w-full h-full object-contain bg-black/60 outline-none"
        @pause="onPause"
        @ended="onPause"
      />

      <img
        v-else
        :src="props.work.thumbnail"
        :alt="props.work.title"
        class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 bg-black/40"
        loading="lazy"
        @error="imgError = true"
      />

      <div
        v-if="props.work.videoUrl && !playing"
        class="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        @click.stop="onPlay"
      >
        <div class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-500/30 backdrop-blur-sm flex items-center justify-center border border-indigo-400/40 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_24px_rgba(99,102,241,0.3)]">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      <div
        v-if="props.work.videoUrl && playing"
        class="absolute top-2 right-2 z-10"
      >
        <button
          @click.stop="onPause"
          class="w-7 h-7 flex items-center justify-center rounded-full bg-black/50 border border-white/20 text-white/60 hover:text-white hover:bg-black/70 transition-all duration-200"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        v-if="imgError && !props.work.videoUrl"
        class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f2e] via-[#13133a] to-[#0a0a1f] border border-white/[0.04]"
      >
        <svg class="w-8 h-8 md:w-10 md:h-10 text-white/10 mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        <p class="text-xs md:text-sm text-white/20 font-mono tracking-wider">项目涉密</p>
        <p class="text-[10px] md:text-xs text-white/10 mt-1">敬请期待</p>
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
          v-if="imgError"
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
