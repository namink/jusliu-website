<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
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

const pulsing = ref(-1)

watch(activeIndex, (val) => {
  pulsing.value = val
  setTimeout(() => pulsing.value = -1, 600)
})

function navigate(index: number) {
  router.push(routes[index].path)
}
</script>

<template>
  <nav class="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 md:gap-2">
    <button
      v-for="(r, i) in routes"
      :key="r.name"
      @click="navigate(i)"
      class="px-4 py-1.5 md:px-5 md:py-2 text-[11px] md:text-xs font-mono tracking-wider rounded-full border transition-all duration-300 backdrop-blur-sm"
      :class="[
        i === activeIndex
          ? 'bg-white/[0.06] border-white/[0.12] text-white/90'
          : 'bg-white/[0.02] border-white/[0.05] text-white/35 hover:text-white/60 hover:border-white/[0.10]',
        pulsing === i ? 'dot-ripple' : ''
      ]"
    >
      {{ r.label }}
    </button>
  </nav>
</template>
