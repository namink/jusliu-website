<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { getRouteIndex } from '@/router'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const routes = [
  { name: 'home', key: 'home', path: '/' },
  { name: 'works', key: 'works', path: '/works' },
  { name: 'about', key: 'about', path: '/about' }
]

const activeIndex = computed(() => getRouteIndex(route.name as string))

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
  <nav class="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 md:gap-1.5">
    <button
      v-for="(r, i) in routes"
      :key="r.name"
      @click="navigate(i)"
      class="relative px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-medium tracking-wide rounded-full border transition-all duration-200 backdrop-blur-sm"
      :class="[
        i === activeIndex
          ? 'bg-white/[0.06] border-white/[0.15] text-white shadow-[0_0_12px_rgba(200,162,255,0.08)]'
          : 'bg-white/[0.01] border-white/[0.04] text-white/35 hover:text-white/65 hover:border-white/[0.08]',
        pulsing === i ? 'dot-ripple' : ''
      ]"
    >
      {{ t(r.key) }}
      <span
        v-if="i === activeIndex"
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
      />
    </button>
  </nav>
</template>
