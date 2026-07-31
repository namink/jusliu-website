<script setup lang="ts">
import { ref, provide } from 'vue'
import { RouterView } from 'vue-router'
import ParticleBg from '@/components/ParticleBg.vue'
import NavDots from '@/components/NavDots.vue'
import GeoBg from '@/components/GeoBg.vue'
import GridDots from '@/components/GridDots.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import { createTransition } from '@/composables/useTransition'

provide('transitionHooks', createTransition())

const particleRef = ref<InstanceType<typeof ParticleBg>>()

function onParticlePause() { particleRef.value?.setPaused(true) }
function onParticleResume() { particleRef.value?.setPaused(false) }
</script>

<template>
  <div class="relative w-full min-h-screen bg-[#0f0f1a] text-white overflow-hidden">
    <GridDots />
    <GeoBg />
    <ParticleBg ref="particleRef" />

    <div class="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#0f0f1a]/30 pointer-events-none" />

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
          <component
            :is="Component"
            @particle-pause="onParticlePause"
            @particle-resume="onParticleResume"
          />
        </Transition>
      </RouterView>
    </main>

    <AudioPlayer />

    <div class="fixed bottom-3 right-6 z-50 text-[9px] font-mono tracking-widest text-white/10 select-none">
      jusliu &middot; 2026
    </div>
  </div>
</template>
