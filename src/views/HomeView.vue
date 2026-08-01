<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollNav } from '@/composables/useScrollNav'
import { useVideoPreload } from '@/composables/useVideoPreload'
import { categories } from '@/data/works'
import FeaturedCarousel from '@/components/FeaturedCarousel.vue'
import { useI18n } from '@/composables/useI18n'

const router = useRouter()
const { t } = useI18n()

useScrollNav()
useVideoPreload()

const visible = ref(false)
const pills = ref<number[]>([])
const scrollRef = ref<HTMLDivElement>()

const allPills = categories.map(c => ({ label: c, category: c }))

onMounted(() => {
  setTimeout(() => visible.value = true, 200)
  allPills.forEach((_, i) => {
    setTimeout(() => pills.value.push(i), 400 + i * 60)
  })
})

onUnmounted(() => {})

function goToCategory(category: string) {
  router.push({ path: '/works', query: { category } })
}

function goTo(path: string) {
  router.push(path)
}
</script>

<template>
  <section class="min-h-screen w-full relative px-6 pt-[6vh] pb-16">
    <div
      class="text-center max-w-5xl mx-auto transition-all duration-1000 ease-out"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
    >
      <p class="text-sm font-mono tracking-[0.3em] text-white/25 mb-6">{{ t('since') }}</p>
      </div>

      <FeaturedCarousel />

      <div class="max-w-5xl mx-auto mt-8 flex flex-col items-center">

      <div class="mb-10 mt-10">
        <div ref="scrollRef" class="flex gap-2 md:gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none mx-auto"
          @wheel.prevent="scrollRef && (scrollRef.scrollLeft += $event.deltaY)">
          <span
            v-for="(pill, i) in allPills"
            :key="pill.label"
            class="px-3.5 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full border backdrop-blur-sm transition-all duration-300 cursor-pointer flex-shrink-0 snap-start whitespace-nowrap"
            :class="[
              pills.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
              i === pills.length - 1 ? 'bg-indigo-500/10 border-indigo-400/25 text-indigo-300 hover:bg-indigo-500/20' : 'bg-white/[0.02] border-white/[0.06] text-white/45 hover:text-white/70 hover:border-white/15'
            ]"
            :style="{ transitionDelay: `${i * 50}ms` }"
            @click="goToCategory(pill.category)"
          >
            {{ pill.label }}
          </span>
        </div>
      </div>

      <div class="mb-12 text-center">
        <p class="text-lg md:text-xl text-white/35 text-breathe">{{ t('taglineTop') }}</p>
        <div class="flex items-center justify-center my-3">
          <span class="block w-8 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
        </div>
        <p class="text-sm md:text-base text-white/25 leading-relaxed">{{ t('taglineSub') }}</p>
      </div>

      <div class="flex items-center justify-center gap-4 mb-10">
        <a href="mailto:conti_717@163.com" title="conti_717@163.com" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/[0.15] transition-all duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
        </a>
        <span title="WeChat: Jusliu" class="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/[0.15] transition-all duration-200 cursor-default">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </span>
      </div>

      <div class="max-w-xs mx-auto bg-white/[0.02] rounded-2xl p-4"> 
        <div class="flex flex-row gap-2 justify-center">
          <button
            @click="goTo('/works')"
            class="px-4 py-2 rounded-full text-white text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(200,162,255,0.15)] flex items-center gap-1.5"
            style="background: linear-gradient(135deg, rgba(139,92,246,0.5), rgba(99,102,241,0.4));"
          >
            <svg class="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            {{ t('works') }}
          </button>
          <button
            @click="goTo('/about')"
            class="px-4 py-2 rounded-full text-white/55 hover:text-white/80 transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-medium backdrop-blur-sm flex items-center gap-1.5"
            style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);"
          >
            <svg class="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {{ t('about') }}
          </button>
        </div>
      </div>

      <div
        @click="goTo('/works')"
        class="mt-16 flex flex-col items-center gap-3 text-white/12 text-[11px] font-mono tracking-widest cursor-pointer group transition-all duration-300 hover:text-white/25 select-none"
      >
        <span class="block w-px h-5 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        {{ t('scroll') }}
        <svg class="w-3.5 h-3.5 animate-bounce text-white/15 group-hover:text-white/30 transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
