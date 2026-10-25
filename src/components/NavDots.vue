<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { useMotion } from '@/composables/useMotion'
import { getRouteIndex } from '@/router'
import { useI18n } from '@/composables/useI18n'

const { t, locale } = useI18n()
const { reducedMotion } = useMotion()
const route = useRoute()


const routes = [
  { name: 'home', key: 'home', path: '/' },
  { name: 'works', key: 'works', path: '/works' },
  { name: 'about', key: 'about', path: '/about' }
]

const activeIndex = computed(() => getRouteIndex(route.name as string))

const nav = ref<HTMLElement>()
const indicator = ref<HTMLElement>()
let resize: ResizeObserver | undefined
let ready = false
async function updateIndicator() {
  await nextTick()
  const active = nav.value?.querySelector<HTMLElement>('a[aria-current]')
  if (!active || !indicator.value || !nav.value) return
  const rect = active.getBoundingClientRect(), parent = nav.value.getBoundingClientRect()
  gsap.to(indicator.value, { x: rect.left - parent.left - 1, y: rect.top - parent.top - 1, width: rect.width, height: rect.height, duration: ready && !reducedMotion.value ? .25 : 0, ease: 'power3.out', overwrite: true })
  ready = true
}
watch([activeIndex, locale], updateIndicator)
onMounted(() => { resize = new ResizeObserver(updateIndicator); if (nav.value) resize.observe(nav.value); updateIndicator() })
onBeforeUnmount(() => { resize?.disconnect(); if (indicator.value) gsap.killTweensOf(indicator.value) })
</script>

<template>
  <nav ref="nav" aria-label="Main navigation" class="site-nav fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 flex w-max whitespace-nowrap items-center gap-1 md:gap-1.5">
    <span ref="indicator" class="nav-indicator" aria-hidden="true" />
    <RouterLink
      v-for="(r, i) in routes"
      :key="r.name"
      :to="r.path"
      :aria-label="t(r.key)"
      :aria-current="i === activeIndex ? 'page' : undefined"
      :title="t(r.key)"
      class="relative min-h-11 min-w-11 justify-center transition-all duration-200 backdrop-blur-sm rounded-full flex items-center gap-1.5 group"
      :class="[
        i === activeIndex
          ? 'px-3 py-1.5 md:px-4 md:py-2 '
          : 'px-2.5 py-1.5 md:px-3.5 md:py-2 opacity-90 hover:opacity-100',
        i === activeIndex
          ? 'text-white'
          : 'text-white/65 hover:text-white/70',
        'nav-item'
      ]"
    >
      <svg aria-hidden="true" v-if="r.name === 'home'" class="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" :class="i === activeIndex ? 'opacity-90' : 'opacity-50 group-hover:opacity-70'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <svg aria-hidden="true" v-if="r.name === 'works'" class="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" :class="i === activeIndex ? 'opacity-90' : 'opacity-50 group-hover:opacity-70'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      <svg aria-hidden="true" v-if="r.name === 'about'" class="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" :class="i === activeIndex ? 'opacity-90' : 'opacity-50 group-hover:opacity-70'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span class="inline text-[11px] md:text-xs font-medium tracking-wide">{{ t(r.key) }}</span>
    </RouterLink>
  </nav>
</template>
