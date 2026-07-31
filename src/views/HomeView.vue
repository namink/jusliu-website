<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(false)
const pills = ref<number[]>([])
const mouseX = ref(0)
const mouseY = ref(0)

const skillPills = [
  { label: 'UE 场景', color: 'indigo' },
  { label: '材质研发', color: 'violet' },
  { label: 'AI平台开发', color: 'sky' },
  { label: '管线工具', color: 'emerald' }
]

function onMouseMove(e: MouseEvent) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 16
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 16
}

onMounted(() => {
  setTimeout(() => visible.value = true, 200)
  skillPills.forEach((_, i) => {
    setTimeout(() => pills.value.push(i), 400 + i * 120)
  })
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})

function goTo(path: string) {
  router.push(path)
}
</script>

<template>
  <section class="min-h-screen w-full flex items-center justify-center relative px-6">
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

      <div class="relative inline-flex justify-center mb-14">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.06)_0%,transparent_70%)] animate-[spin_20s_linear_infinite]" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-[radial-gradient(ellipse,rgba(129,140,248,0.04)_0%,transparent_70%)] animate-[spin_25s_linear_infinite_reverse]" />

        <h1
          class="relative flex items-center gap-3 md:gap-5 text-5xl md:text-7xl lg:text-8xl font-black text-shimmer select-none"
          :style="{ transform: `translate(${mouseX * 0.15}px, ${mouseY * 0.15}px)` }"
        >
          <span
            class="inline-block transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'"
            style="transition-delay: 300ms"
          >刘</span>
          <span
            class="inline-block transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'"
            style="transition-delay: 500ms"
          >志</span>
          <span
            class="inline-block transition-all duration-1000 ease-out"
            :class="visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'"
            style="transition-delay: 700ms"
          >贤</span>
        </h1>
      </div>

      <div class="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-3 mb-14">
        <span
          v-for="(pill, i) in skillPills"
          :key="pill.label"
          class="skill-pill px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm rounded-full border backdrop-blur-sm transition-all duration-700 ease-out cursor-default"
          :class="[
            pills.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            i === 0 ? 'bg-indigo-500/10 border-indigo-400/25 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400/50' : '',
            i === 1 ? 'bg-violet-500/10 border-violet-400/20 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400/50' : '',
            i === 2 ? 'bg-sky-500/10 border-sky-400/20 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400/50' : '',
            i === 3 ? 'bg-emerald-500/10 border-emerald-400/20 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400/50' : ''
          ]"
          :style="{
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2.8 + i * 0.5}s`
          }"
        >
          {{ pill.label }}
        </span>
      </div>

      <div class="flex items-center justify-center gap-4 mb-12">
        <span class="block w-14 md:w-18 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <p class="text-base md:text-lg text-white/30 leading-relaxed whitespace-nowrap">
          从&nbsp;0&nbsp;到&nbsp;1，连接艺术与技术的桥梁
        </p>
        <span class="block w-14 md:w-18 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="goTo('/works')"
          class="relative px-8 py-3 rounded-full text-white/90 hover:text-white transition-all duration-300 text-sm font-medium overflow-hidden group"
          style="background: linear-gradient(#0a0a1a, #0a0a1a) padding-box, linear-gradient(135deg, #6366f1, #818cf8) border-box; border: 1px solid transparent;"
        >
          <span class="relative z-10">浏览作品</span>
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
            style="box-shadow: 0 0 40px 8px rgba(99,102,241,0.15), 0 0 20px 4px rgba(129,140,248,0.1)" />
        </button>
        <button
          @click="goTo('/about')"
          class="px-8 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/45 hover:text-white/75 hover:border-white/15 transition-all duration-300 text-sm backdrop-blur-sm"
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
