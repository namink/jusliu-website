<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { works } from '@/data/works'
import { caseStudies } from '@/data/caseStudies'
import { localizeWork } from '@/data/workContent'
import { useI18n } from '@/composables/useI18n'
import ManagedVideo from '@/components/ManagedVideo.vue'
import ContactActions from '@/components/ContactActions.vue'
const emit = defineEmits<{ previewImage: [src: string, alt: string] }>()
const route = useRoute()
const heroLoaded = ref(false)
const heroFailed = ref(false)
const { t, locale } = useI18n()
const original = computed(() => works.find(work => work.id === route.params.id))
const work = computed(() => original.value && localizeWork(original.value, locale.value))
const detail = computed(() => caseStudies[String(route.params.id)])
const lang = computed(() => locale.value === 'zh' ? 0 : 1)
const related = computed(() => works.filter(item => item.id !== original.value?.id && item.category === original.value?.category).slice(0,3).map(item => localizeWork(item, locale.value)))
watchEffect(() => { document.title = `${work.value?.title || t('projectMissing')} | jusliu` })
function preview(src: string, alt: string) { emit('previewImage', src, alt) }
</script>
<template>
  <section class="project-detail page-shell">
    <RouterLink class="back-link" :to="{ path: '/works', query: route.query }">← {{ t('backWorks') }}</RouterLink>
    <template v-if="work">
      <header class="detail-header"><h1>{{ work.title }}</h1><p>{{ work.description }}</p><ul class="work-tags"><li v-for="tag in work.tags" :key="tag">{{ tag }}</li></ul></header>
      <div v-if="work.thumbnail" class="detail-hero" :aria-busy="!heroLoaded">
        <button type="button" :aria-label="`${t('previewImage')}: ${work.title}`" @click="preview(work.thumbnail, work.title)">
          <img :src="work.thumbnail" :alt="work.title" width="1600" height="1000" fetchpriority="high" decoding="async" @load="heroLoaded = true" @error="heroLoaded = true; heroFailed = true" />
        </button>
        <p v-if="heroFailed" role="status">{{ t('imageUnavailable') }}</p>
        <p v-if="work.category === 'AIGC'">{{ t('coverNote') }}</p>
      </div>
      <div v-if="detail" class="case-sections">
        <section><h2>{{ t('projectGoal') }}</h2><p>{{ detail.goal[lang] }}</p></section>
        <section><h2>{{ t('projectScope') }}</h2><p>{{ detail.scope[lang] }}</p></section>
        <section><h2>{{ t('projectFocus') }}</h2><ul><li v-for="line in detail.focus" :key="line[0]">{{ line[lang] }}</li></ul></section>
      </div>
      <section v-if="work.videoUrl || detail?.gallery.length" class="detail-media"><h2>{{ t('projectMedia') }}</h2>
        <ManagedVideo v-if="work.videoUrl" :key="work.id" :src="work.videoUrl" :poster="work.poster || work.thumbnail" :label="work.title" />
        <div v-if="detail" class="detail-gallery">
          <figure v-for="item in detail.gallery" :key="item.src"><button type="button" :aria-label="`${t('previewImage')}: ${item.caption[lang]}`" @click="preview(item.src,item.caption[lang])"><img :src="item.src" :alt="item.caption[lang]" width="1280" height="720" loading="lazy" decoding="async" /></button><figcaption>{{ item.caption[lang] }}</figcaption></figure>
        </div>
      </section>
      <section v-if="related.length" class="related-projects"><h2>{{ t('relatedWorks') }}</h2><div><RouterLink v-for="item in related" :key="item.id" :to="{ name: 'work-detail', params: { id: item.id }, query: route.query }">{{ item.title }} <span aria-hidden="true">↗</span></RouterLink></div></section>
      <ContactActions />
    </template>
    <h1 v-else>{{ t('projectMissing') }}</h1>
  </section>
</template>
