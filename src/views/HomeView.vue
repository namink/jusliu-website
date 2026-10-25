<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { categories, works } from '@/data/works'
import { selectedCaseIds } from '@/data/caseStudies'
import { categoryText, localizeWork } from '@/data/workContent'
import { gsap } from 'gsap'
import { useMotion } from '@/composables/useMotion'
import ContactActions from '@/components/ContactActions.vue'
import FeaturedCarousel from '@/components/FeaturedCarousel.vue'
import { useI18n } from '@/composables/useI18n'

const { t, locale } = useI18n()


const root = ref<HTMLElement>()
const { reducedMotion } = useMotion()
const allPills = categories.map(category => ({ category }))
const selected = computed(() => selectedCaseIds.flatMap(id => {
  const work = works.find(item => item.id === id)
  return work ? [localizeWork(work, locale.value)] : []
}))
let context: gsap.Context | undefined
onMounted(() => {
  if (reducedMotion.value) return
  context = gsap.context(() => {
    gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } })
      .from('.home-title', { y: 10, opacity: 0, duration: .35 })
      .from('.featured-reel', { y: 14, opacity: 0, duration: .45 }, .1)
      .from('.home-category', { opacity: 0, y: 5, duration: .25, stagger: .025 }, .3)
  }, root.value)
})
onBeforeUnmount(() => context?.revert())
</script>

<template>
  <section ref="root" class="min-h-screen w-full relative px-6 pt-28 pb-16">
    <div class="text-center max-w-5xl mx-auto">
      <h1 class="home-title mb-8">jusliu <span>Technical Artist / Technical Director</span></h1>
      </div>

      <FeaturedCarousel />

      <div class="max-w-5xl mx-auto mt-8 flex flex-col items-center">

      <div class="mb-10 mt-6 w-full">
        <div class="flex flex-wrap justify-center gap-2 md:gap-3 mx-auto"
          >
          <RouterLink
            v-for="pill in allPills"
            :key="pill.category"
            class="home-category min-h-11 flex items-center px-4 py-2 text-xs md:text-sm rounded-full border border-white/10 text-white/70 hover:text-white hover:border-indigo-400/50 transition-colors"
            :to="{ path: '/works', query: { category: pill.category } }"
          >
            {{ categoryText(pill.category, locale) }}
          </RouterLink>
        </div>
      </div>

      <div class="mb-12 text-center">
        <p class="text-lg md:text-xl text-white/85">{{ t('taglineTop') }}</p>
        <div class="flex items-center justify-center my-3">
          <span class="block w-8 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
        </div>
        <p class="text-sm md:text-base text-white/65 leading-relaxed">{{ t('taglineSub') }}</p>
      </div>

      <section class="selected-projects">
        <h2>{{ t('selectedCases') }}</h2><p>{{ t('selectedIntro') }}</p>
        <div><RouterLink v-for="work in selected" :key="work.id" :to="{ name: 'work-detail', params: { id: work.id } }"><img :src="work.thumbnail" :alt="work.title" width="640" height="400" loading="lazy" decoding="async" /><h3>{{ work.title }}</h3><span>{{ t('viewProject') }} ↗</span></RouterLink></div>
      </section>
      <ContactActions />

      <div class="flex flex-row gap-2 justify-center">
          <RouterLink
            to="/works"
            class="primary-link min-h-11 px-5 py-2.5 rounded-full text-white text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(196,179,147,0.15)] flex items-center gap-1.5"

          >
            <svg aria-hidden="true" class="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            {{ t('works') }}
          </RouterLink>
          <RouterLink
            to="/about"
            class="min-h-11 px-5 py-2.5 rounded-full text-white/55 hover:text-white/80 transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-medium backdrop-blur-sm flex items-center gap-1.5"
            style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);"
          >
            <svg aria-hidden="true" class="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {{ t('about') }}
          </RouterLink>
        </div>

      <RouterLink
        to="/works"
        class="mt-16 flex flex-col items-center gap-3 text-white/60 text-[11px] font-mono tracking-widest cursor-pointer group transition-all duration-300 hover:text-white/85 select-none"
      >
        <span class="block w-px h-5 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        {{ t('allProjects') }}
        <svg aria-hidden="true" class="w-3.5 h-3.5 text-white/60 group-hover:text-white/85 transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
