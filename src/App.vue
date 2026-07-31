<script setup lang="ts">
import { provide } from 'vue'
import { RouterView } from 'vue-router'
import ParticleBg from '@/components/ParticleBg.vue'
import NavDots from '@/components/NavDots.vue'
import { createTransition } from '@/composables/useTransition'

provide('transitionHooks', createTransition())
</script>

<template>
  <div class="relative w-full min-h-screen bg-[#0a0a1a] text-white overflow-hidden">
    <ParticleBg />

    <div class="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#0a0a1a]/80 pointer-events-none" />

    <NavDots />

    <main class="relative z-[2]">
      <RouterView v-slot="{ Component }">
        <Transition
          :css="false"
          @before-enter="($event) => createTransition().onBeforeEnter($event)"
          @enter="($event, $done) => createTransition().onEnter($event, $done)"
          @leave="($event, $done) => createTransition().onLeave($event, $done)"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>
