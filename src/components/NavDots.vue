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
  <nav class="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 md:gap-1.5">
    <button
      v-for="(r, i) in routes"
      :key="r.name"
      @click="navigate(i)"
      :title="t(r.key)"
      class="relative transition-all duration-200 backdrop-blur-sm rounded-full flex items-center gap-1.5 group"
      :class="[
        i === activeIndex
          ? 'px-3 py-1.5 md:px-4 md:py-2 shadow-[0_0_16px_rgba(200,162,255,0.15)]'
          : 'px-2.5 py-1.5 md:px-3.5 md:py-2 opacity-70 hover:opacity-100',
        i === activeIndex
          ? 'text-white'
          : 'text-white/40 hover:text-white/70',
        pulsing === i ? 'dot-ripple' : ''
      ]"
      :style="i === activeIndex ? { background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(99,102,241,0.3))' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }"
    >
      <svg v-if="r.name === 'home'" class="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" :class="i === activeIndex ? 'opacity-90' : 'opacity-50 group-hover:opacity-70'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <svg v-if="r.name === 'works'" class="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" :class="i === activeIndex ? 'opacity-90' : 'opacity-50 group-hover:opacity-70'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      <svg v-if="r.name === 'about'" class="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" :class="i === activeIndex ? 'opacity-90' : 'opacity-50 group-hover:opacity-70'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span class="hidden md:inline text-[11px] md:text-xs font-medium tracking-wide">{{ t(r.key) }}</span>
    </button>
  </nav>
</template>
