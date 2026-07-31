<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { getRouteIndex } from '@/router'

const route = useRoute()
const router = useRouter()

const routes = [
  { name: 'home', label: 'Home', path: '/' },
  { name: 'works', label: 'Works', path: '/works' },
  { name: 'about', label: 'About', path: '/about' }
]

const activeIndex = computed(() => {
  const name = route.name as string
  return getRouteIndex(name)
})

function navigate(index: number) {
  router.push(routes[index].path)
}
</script>

<template>
  <nav class="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 md:gap-6">
    <button
      v-for="(r, i) in routes"
      :key="r.name"
      @click="navigate(i)"
      class="group relative flex items-center gap-3"
      :aria-label="r.label"
    >
      <span
        class="text-xs md:text-sm font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/70"
        :class="{ 'opacity-100 !text-white': i === activeIndex }"
      >
        {{ r.label }}
      </span>
      <span
        class="block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border transition-all duration-500"
        :class="i === activeIndex
          ? 'bg-indigo-400 border-indigo-400 scale-125 shadow-[0_0_12px_rgba(129,140,248,0.6)]'
          : 'bg-white/20 border-white/30 hover:bg-white/50 hover:border-white/50'"
      />
    </button>
  </nav>
</template>
