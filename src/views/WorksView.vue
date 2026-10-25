<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { works, categories } from '@/data/works'
import WorkCard from '@/components/WorkCard.vue'
import { categoryText } from '@/data/workContent'
import { useI18n } from '@/composables/useI18n'
import { useMotion } from '@/composables/useMotion'

const emit = defineEmits<{ previewImage: [src: string, alt: string] }>()
const { t, locale } = useI18n()
const { reducedMotion } = useMotion()
const route = useRoute()
const router = useRouter()
const perPage = 8
const activeCategory = computed(() => {
  const value = route.query.category
  return typeof value === 'string' && categories.includes(value) ? value : ''
})
const filteredWorks = computed(() => {
  const list = activeCategory.value ? works.filter(w => w.category === activeCategory.value) : works
  return [...list].sort((a, b) => Number(!!b.videoUrl) - Number(!!a.videoUrl))
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredWorks.value.length / perPage)))
const currentPage = computed(() => {
  const page = Number(route.query.page)
  return Number.isSafeInteger(page) && page > 0 ? Math.min(page, totalPages.value) : 1
})
const paginatedWorks = computed(() => filteredWorks.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))
const allTabs = ['', ...categories]
function selectCategory(category: string) {
  router.push({ query: { ...route.query, category: category || undefined, page: undefined } })
}
function goPage(page: number) {
  router.push({ query: { ...route.query, page: page === 1 ? undefined : String(page) } })
  window.scrollTo({ top: 0, behavior: reducedMotion.value ? 'instant' : 'smooth' })
}
function categoryLabel(category: string) {
  return category ? categoryText(category, locale.value) : t('all')
}
</script>

<template>
  <section class="portfolio-page page-shell">
    <header class="portfolio-intro">
      <div><h1>{{ t('portfolioSub') }}</h1><p>{{ t('portfolioHint') }}</p></div>
      <span class="portfolio-total">{{ works.length }} {{ t('workCount') }}</span>
    </header>
    <div class="portfolio-filters" role="group" :aria-label="t('filterWorks')">
      <button v-for="tab in allTabs" :key="tab" type="button"
        :aria-pressed="activeCategory === tab" :class="['filter-button', { active: activeCategory === tab }]"
        @click="selectCategory(tab)">
        {{ categoryLabel(tab) }}<span>{{ tab ? works.filter(w => w.category === tab).length : works.length }}</span>
      </button>
    </div>
    <p class="results-summary" role="status">{{ categoryLabel(activeCategory) }} <span aria-hidden="true">/</span> {{ filteredWorks.length }} {{ t('workCount') }}</p>
    <TransitionGroup name="work-list" tag="div" class="portfolio-grid">
      <WorkCard v-for="(work, i) in paginatedWorks" :key="work.id" :work="work" :index="i"
        @preview-image="(src, alt) => emit('previewImage', src, alt)" />
    </TransitionGroup>
    <nav v-if="totalPages > 1" class="pagination" :aria-label="t('pagination')">
      <button type="button" :disabled="currentPage === 1" :aria-label="t('previousPage')" @click="goPage(currentPage - 1)">
        <svg aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button v-for="page in totalPages" :key="page" type="button" :aria-current="currentPage === page ? 'page' : undefined"
        :aria-label="`${t('pageLabel')} ${page}`" @click="goPage(page)">{{ page }}</button>
      <button type="button" :disabled="currentPage === totalPages" :aria-label="t('nextPage')" @click="goPage(currentPage + 1)">
        <svg aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
      </button>
    </nav>
  </section>
</template>
