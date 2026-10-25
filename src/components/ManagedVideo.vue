<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { claimVideo, releaseVideo } from '@/composables/useMediaPlayback'
import { useI18n } from '@/composables/useI18n'
defineProps<{ src: string; poster?: string; label: string; autoplay?: boolean }>()
const { t } = useI18n()
const video = ref<HTMLVideoElement>()
const failed = ref(false)
let observer: IntersectionObserver | undefined
onMounted(() => {
  observer = new IntersectionObserver(entries => { if (!entries[0]?.isIntersecting) video.value?.pause() }, { threshold: 0.1 })
  if (video.value) observer.observe(video.value)
})
onBeforeUnmount(() => { observer?.disconnect(); if (video.value) { video.value.pause(); releaseVideo(video.value) } })
</script>
<template>
  <div class="managed-video">
    <video ref="video" :src="src" :poster="poster" :aria-label="label" controls playsinline :autoplay="autoplay" preload="metadata"
      @play="video && claimVideo(video)" @pause="video && releaseVideo(video)" @ended="video && releaseVideo(video)" @error="failed = true; video && releaseVideo(video)" />
    <p v-if="failed" class="media-error" role="status">{{ t('videoUnavailable') }} <a :href="src" target="_blank" rel="noopener noreferrer">{{ t('openVideo') }} ↗</a></p>
  </div>
</template>
