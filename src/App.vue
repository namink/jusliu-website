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

function closePreview() {
  showPreview.value = false
}
</script>

<template>
  <div class="relative w-full min-h-screen bg-[#0f0f1a] text-white overflow-hidden">
    <GridDots />
    <GeoBg />
    <ParticleBg ref="particleRef" />

    <div class="fixed top-0 left-0 right-0 h-72 z-0 pointer-events-none opacity-40" style="background: radial-gradient(ellipse at 50% 0%, rgba(136,168,255,0.08) 0%, transparent 70%);" />

    <div class="fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
      <span class="text-[14vw] font-black tracking-[0.3em] text-white/[0.02] leading-none">JUSLIU</span>
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
