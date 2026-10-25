<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { categories } from '@/data/works'
import FeaturedCarousel from '@/components/FeaturedCarousel.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()


const visible = ref(false)
const pills = ref<number[]>([])

const allPills = categories.map(c => ({ label: c, category: c }))

onMounted(() => {
  setTimeout(() => visible.value = true, 200)
  allPills.forEach((_, i) => {
    setTimeout(() => pills.value.push(i), 400 + i * 60)
  })
})


</script>

<template>
  <section class="min-h-screen w-full relative px-6 pt-28 pb-16">
    <div
      class="text-center max-w-5xl mx-auto transition-all duration-1000 ease-out"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
    >
      <h1 class="home-title mb-8">jusliu <span>Technical Artist / Technical Director</span></h1>
      </div>

      <FeaturedCarousel />

      <div class="max-w-5xl mx-auto mt-8 flex flex-col items-center">

      <div class="mb-10 mt-6 w-full">
        <div class="flex flex-wrap justify-center gap-2 md:gap-3 mx-auto"
          >
          <RouterLink
            v-for="(pill, i) in allPills"
            :key="pill.label"
            class="min-h-11 flex items-center px-3.5 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full border backdrop-blur-sm transition-all duration-300 cursor-pointer flex-shrink-0 snap-start whitespace-nowrap"
            :class="[
              pills.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
              i === pills.length - 1 ? 'bg-indigo-500/10 border-indigo-400/25 text-indigo-300 hover:bg-indigo-500/20' : 'bg-white/[0.02] border-white/[0.06] text-white/70 hover:text-white/70 hover:border-white/15'
            ]"
            :style="{ transitionDelay: `${i * 50}ms` }"
            :to="{ path: '/works', query: { category: pill.category } }"
          >
            {{ pill.label }}
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

      <div class="flex items-center justify-center gap-4 mb-10">
        <a href="mailto:conti_717@163.com" title="conti_717@163.com" aria-label="Email: conti_717@163.com" class="w-11 h-11 flex items-center justify-center rounded-full border border-white/[0.06] text-white/65 hover:text-white/85 hover:border-white/[0.15] transition-all duration-200">
          <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
        </a>
        <span title="WeChat: Jusliu" class="w-11 h-11 flex items-center justify-center rounded-full border border-white/[0.06] text-white/65 hover:text-white/85 hover:border-white/[0.15] transition-all duration-200 cursor-default">
          <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </span>
      </div>

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
        {{ t('scroll') }}
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
