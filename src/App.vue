<script setup lang="ts">
import { ref, provide } from 'vue'
import { RouterView } from 'vue-router'
import ParticleBg from '@/components/ParticleBg.vue'
import NavDots from '@/components/NavDots.vue'
import GeoBg from '@/components/GeoBg.vue'
import GridDots from '@/components/GridDots.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import ImageViewer from '@/components/ImageViewer.vue'
import { createTransition } from '@/composables/useTransition'

provide('transitionHooks', createTransition())

const particleRef = ref<InstanceType<typeof ParticleBg>>()

function onParticlePause() { particleRef.value?.setPaused(true) }
function onParticleResume() { particleRef.value?.setPaused(false) }

const previewSrc = ref('')
const previewAlt = ref('')
const showPreview = ref(false)

function onPreviewImage(src: string, alt: string) {
  previewSrc.value = src
  previewAlt.value = alt
  showPreview.value = true
}

function closePreview() { showPreview.value = false }
</script>

<template>
  <div class="relative w-full min-h-screen bg-[#0f0f1a] text-white overflow-hidden">
    <GridDots />
    <GeoBg />
    <ParticleBg ref="particleRef" />

    <div class="fixed top-0 left-0 right-0 h-72 z-0 pointer-events-none opacity-40" style="background: radial-gradient(ellipse at 50% 0%, rgba(136,168,255,0.08) 0%, transparent 70%);" />

    <div class="fixed top-[15%] left-[5%] right-[5%] h-px z-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
    <div class="fixed bottom-[20%] left-[5%] right-[5%] h-px z-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />

    <div class="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
      <span class="absolute top-[20%] -right-10 text-[4vw] font-bold text-white/[0.04] tracking-[0.5em] whitespace-nowrap strip-slide-1" style="transform: rotate(-10deg);">TECHNICAL ARTIST</span>
      <span class="absolute top-[48%] -left-10 text-[4vw] font-bold text-white/[0.03] tracking-[0.5em] whitespace-nowrap strip-slide-2" style="transform: rotate(-6deg);">TECHNICAL DIRECTOR</span>
      <span class="absolute top-[72%] -right-20 text-[3vw] font-bold text-white/[0.02] tracking-[0.8em] whitespace-nowrap strip-slide-3" style="transform: rotate(-14deg);">● ● ● ● ● ● ● ● ● ● ●</span>
    </div>

    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
      <div class="flex items-center gap-1 md:gap-2 text-[12vw] font-black leading-none tracking-[0.15em]">
        <span style="color: #a5b4fc; opacity: 0.08;">J</span>
        <span style="color: #c4b5fd; opacity: 0.10; transform: translateY(-6px);">U</span>
        <span style="color: #a5b4fc; opacity: 0.08;">S</span>
        <span style="color: #c4b5fd; opacity: 0.10; transform: translateY(4px);">L</span>
        <span style="color: #a5b4fc; opacity: 0.08;">I</span>
        <span style="color: #c4b5fd; opacity: 0.12; transform: translateY(-2px);">U</span>
      </div>
    </div>

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
            @preview-image="onPreviewImage"
          />
        </Transition>
      </RouterView>
    </main>

    <AudioPlayer />

    <ImageViewer :src="previewSrc" :alt="previewAlt" :show="showPreview" @close="closePreview" />

    <div class="fixed bottom-3 right-6 z-50 text-[9px] font-mono tracking-widest text-white/10 select-none">
      jusliu &middot; 2026
    </div>
  </div>
</template>

<style>
.brand-breathe {
  animation: brandBreathe 8s ease-in-out infinite;
}
@keyframes brandBreathe {
  0%, 50%, 100% { opacity: 0.04; }
  25%, 75% { opacity: 0.12; }
}

.strip-slide-1 {
  animation: slideStrip1 14s ease-in-out infinite alternate;
}
.strip-slide-2 {
  animation: slideStrip2 16s ease-in-out infinite alternate;
}
.strip-slide-3 {
  animation: slideStrip3 20s ease-in-out infinite alternate;
}

@keyframes slideStrip1 {
  from { transform: rotate(-10deg) translateX(-8%); }
  to   { transform: rotate(-10deg) translateX(8%); }
}
@keyframes slideStrip2 {
  from { transform: rotate(-6deg) translateX(8%); }
  to   { transform: rotate(-6deg) translateX(-8%); }
}
@keyframes slideStrip3 {
  from { transform: rotate(-14deg) translateX(-12%); }
  to   { transform: rotate(-14deg) translateX(12%); }
}
</style>
