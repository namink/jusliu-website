<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollNav } from '@/composables/useScrollNav'
import { useVideoPreload } from '@/composables/useVideoPreload'
import { categories } from '@/data/works'
import FeaturedCarousel from '@/components/FeaturedCarousel.vue'

const router = useRouter()

useScrollNav()
useVideoPreload()

const visible = ref(false)
const pills = ref<number[]>([])
const scrollRef = ref<HTMLDivElement>()

const allPills = [{ label: '全部作品', category: '', color: 'slate' }, ...categories.map(c => ({
  label: c,
  category: c,
}))]

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
  <section class="min-h-screen w-full flex items-center justify-center relative px-6 pb-24">
    <div
      class="text-center max-w-2xl mx-auto transition-all duration-1000 ease-out"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
    >
      <div class="mb-10 space-y-2.5">
        <p class="text-[11px] md:text-xs font-mono tracking-[0.4em] text-indigo-400/60 flex items-center justify-center gap-3">
          <span class="block w-12 h-px bg-gradient-to-r from-transparent to-indigo-400/40" />
          TECHNICAL ARTIST
          <span class="block w-12 h-px bg-gradient-to-l from-transparent to-indigo-400/40" />
        </p>
        <p class="text-[11px] md:text-xs font-mono tracking-[0.4em] text-indigo-400/60 flex items-center justify-center gap-3">
          <span class="block w-12 h-px bg-gradient-to-r from-transparent to-indigo-400/40" />
          TECHNICAL DIRECTOR
          <span class="block w-12 h-px bg-gradient-to-l from-transparent to-indigo-400/40" />
        </p>
      </div>

      <div class="relative mb-8">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[radial-gradient(ellipse,rgba(200,162,255,0.05)_0%,transparent_70%)] animate-[spin_20s_linear_infinite]" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 rounded-full bg-[radial-gradient(ellipse,rgba(136,168,255,0.03)_0%,transparent_70%)] animate-[spin_25s_linear_infinite_reverse]" />

        <h1
          class="relative flex items-center justify-center gap-2 md:gap-4 text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.2em] text-shimmer text-breathe select-none"
        >
          <span class="inline-block transition-all duration-1000 ease-out" :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'" style="transition-delay: 200ms">J</span>
          <span class="inline-block transition-all duration-1000 ease-out" :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'" style="transition-delay: 300ms">U</span>
          <span class="inline-block transition-all duration-1000 ease-out" :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'" style="transition-delay: 400ms">S</span>
          <span class="inline-block transition-all duration-1000 ease-out" :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'" style="transition-delay: 500ms">L</span>
          <span class="inline-block transition-all duration-1000 ease-out" :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'" style="transition-delay: 600ms">I</span>
          <span class="inline-block transition-all duration-1000 ease-out" :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'" style="transition-delay: 700ms">U</span>
          <span class="inline-block transition-all duration-1000 ease-out" :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'" style="transition-delay: 800ms">'</span>
        </h1>
      </div>

      <p class="text-[11px] font-mono tracking-[0.3em] text-white/15 mb-8">since 2022</p>

      <FeaturedCarousel />

      <div class="mb-10 mt-10">
        <div ref="scrollRef" class="flex gap-2 md:gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none mx-auto max-w-lg md:max-w-2xl"
          @wheel.prevent="scrollRef && (scrollRef.scrollLeft += $event.deltaY)">
          <span
            v-for="(pill, i) in allPills"
            :key="pill.label"
            class="skill-pill px-3.5 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full border backdrop-blur-sm transition-all duration-300 cursor-pointer flex-shrink-0 snap-start whitespace-nowrap"
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

      <div class="flex items-center justify-center gap-4 mb-10">
        <span class="block w-14 md:w-18 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <p class="text-base md:text-lg text-white/30 leading-relaxed whitespace-nowrap">
          从&nbsp;0&nbsp;到&nbsp;1，连接艺术与技术的桥梁
        </p>
        <span class="block w-14 md:w-18 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      <div class="flex items-center justify-center gap-5 mb-10">
        <a href="mailto:conti_717@163.com" class="group flex items-center gap-1.5 text-xs text-white/30 hover:text-white/55 transition-colors duration-200">
          <svg class="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
          conti_717@163.com
        </a>
        <span class="w-px h-3 bg-white/[0.06]" />
        <a href="tel:18070154965" class="group flex items-center gap-1.5 text-xs text-white/30 hover:text-white/55 transition-colors duration-200">
          <svg class="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          18070154965
        </a>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="goTo('/works')"
          class="relative px-8 py-3 rounded-full text-white/90 hover:text-white transition-all duration-150 active:scale-95 text-sm font-medium overflow-hidden group"
          style="background: linear-gradient(#0f0f1a, #0f0f1a) padding-box, linear-gradient(135deg, #6366f1, #818cf8) border-box; border: 1px solid transparent;"
        >
          <span class="relative z-10">浏览作品</span>
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
            style="box-shadow: 0 0 40px 8px rgba(99,102,241,0.15), 0 0 20px 4px rgba(129,140,248,0.1)" />
        </button>
        <button
          @click="goTo('/about')"
          class="px-8 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/45 hover:text-white/75 hover:border-white/15 transition-all duration-150 active:scale-95 text-sm backdrop-blur-sm"
        >
          了解更多
        </button>
      </div>

      <div
        @click="goTo('/works')"
        class="mt-16 flex flex-col items-center gap-3 text-white/12 text-[11px] font-mono tracking-widest cursor-pointer group transition-all duration-300 hover:text-white/25 select-none"
      >
        <span class="block w-px h-5 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        SCROLL
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
