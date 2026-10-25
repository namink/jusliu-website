<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Work } from '@/data/works'
import { RouterLink } from 'vue-router'
import ManagedVideo from './ManagedVideo.vue'
import { localizeWork } from '@/data/workContent'
import { useI18n } from '@/composables/useI18n'
const props = defineProps<{ work: Work; index: number }>()
const emit = defineEmits<{ previewImage: [src: string, alt: string] }>()
const { t, locale } = useI18n()
const work = computed(() => localizeWork(props.work, locale.value))
const eagerCount = window.innerWidth < 640 ? 1 : 3
const playing = ref(false)
const imgError = ref(false)
</script>

<template>
  <article class="work-card">
    <div class="work-media">
      <ManagedVideo v-if="work.videoUrl && playing" :src="work.videoUrl" :poster="work.poster || work.thumbnail" :label="work.title" autoplay />
      <button v-else-if="work.thumbnail && !imgError" type="button" class="work-preview"
        :aria-label="`${work.videoUrl ? t('playDemo') : t('previewImage')}: ${work.title}`"
        @click="work.videoUrl ? (playing = true) : emit('previewImage', work.thumbnail, work.title)">
        <img :src="work.thumbnail" :alt="work.title" width="960" height="600" :loading="index < eagerCount ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'" decoding="async" @error="imgError = true" />
        <span v-if="work.videoUrl" class="play-control" aria-hidden="true">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </span>
        <span v-else class="preview-label" aria-hidden="true">{{ t('previewImage') }} ↗</span>
      </button>
      <div v-else class="work-placeholder">
        <svg aria-hidden="true" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
        <span>{{ imgError ? t('imageUnavailable') : t('ndaLabel') }}</span>
        <small>{{ imgError ? t('imageRetryHint') : t('ndaHint') }}</small>
        <button v-if="imgError" type="button" class="text-link" @click="imgError = false">{{ t('retry') }}</button>
        <button v-if="work.videoUrl" type="button" class="text-link" @click="playing = true">{{ t('playDemo') }}</button>
      </div>
    </div>
    <div class="work-copy">
      <div class="work-meta"><span>{{ work.category }}</span><span v-if="work.videoUrl">VIDEO</span><span v-else-if="!work.thumbnail">NDA</span></div>
      <h2><RouterLink :to="{ name: 'work-detail', params: { id: work.id }, query: $route.query }">{{ work.title }}</RouterLink></h2>
      <p>{{ work.description }}</p>
      <ul class="work-tags" :aria-label="t('technologies')"><li v-for="tag in work.tags" :key="tag">{{ tag }}</li></ul>
      <RouterLink class="project-link" :to="{ name: 'work-detail', params: { id: work.id }, query: $route.query }">{{ t('viewProject') }} <span aria-hidden="true">↗</span></RouterLink>
    </div>
  </article>
</template>
