<script setup lang="ts">
import type { Work } from '@/data/works'
import { ref } from 'vue'

const props = defineProps<{
  work: Work
  index: number
}>()

const imgError = ref(false)
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-400/30 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
    :style="{ transitionDelay: `${props.index * 60}ms` }"
  >
    <div class="aspect-[16/10] overflow-hidden relative">
      <img
        v-if="!imgError"
        :src="props.work.thumbnail"
        :alt="props.work.title"
        class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 bg-black/40"
        loading="lazy"
        @error="imgError = true"
      />

      <div
        v-if="imgError"
        class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f2e] via-[#13133a] to-[#0a0a1f] border border-white/[0.04]"
      >
        <svg class="w-8 h-8 md:w-10 md:h-10 text-white/10 mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        <p class="text-xs md:text-sm text-white/20 font-mono tracking-wider">项目涉密</p>
        <p class="text-[10px] md:text-xs text-white/10 mt-1">敬请期待</p>
      </div>

      <div
        v-if="props.work.videoUrl"
        class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-500/40 backdrop-blur-sm flex items-center justify-center border border-indigo-400/30">
          <svg class="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>

    <div class="p-4 md:p-5">
      <div class="flex items-center gap-2">
        <span class="text-[10px] md:text-xs font-mono tracking-widest text-indigo-400/80 uppercase">
          {{ props.work.category }}
        </span>
        <span
          v-if="props.work.videoUrl"
          class="text-[10px] text-white/30 border border-white/[0.08] rounded px-1.5 py-px"
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
