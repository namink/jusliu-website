<script setup lang="ts">
import { ref, provide } from 'vue'
import { RouterView } from 'vue-router'
import ParticleBg from '@/components/ParticleBg.vue'
import NavDots from '@/components/NavDots.vue'
import GeoBg from '@/components/GeoBg.vue'
import GridDots from '@/components/GridDots.vue'
import SkillCloud from '@/components/SkillCloud.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import ImageViewer from '@/components/ImageViewer.vue'
import { createTransition } from '@/composables/useTransition'
import { useI18n } from '@/composables/useI18n'

const { toggleLocale, locale } = useI18n()
provide('i18n', useI18n())
provide('transitionHooks', createTransition())

const particleRef = ref<InstanceType<typeof ParticleBg>>()

function onParticlePause() { particleRef.value?.setPaused(true) }
function onParticleResume() { particleRef.value?.setPaused(false) }

const previewSrc = ref('')
const previewAlt = ref('')
const showPreview = ref(false)

function onPreviewImage(src: string, alt: string) {
  previewSrc.value = src; previewAlt.value = alt; showPreview.value = true
}
function closePreview() { showPreview.value = false }
</script>

<template>
  <div class="relative w-full min-h-screen bg-[#0f0f1a] text-white overflow-hidden">
    <GridDots /><GeoBg /><ParticleBg ref="particleRef" />
    <div class="fixed top-0 left-0 right-0 h-72 z-0 pointer-events-none opacity-40" style="background: radial-gradient(ellipse at 50% 0%, rgba(136,168,255,0.08) 0%, transparent 70%);" />
    <div class="fixed top-[15%] left-[5%] right-[5%] h-px z-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
    <div class="fixed bottom-[20%] left-[5%] right-[5%] h-px z-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />

    <div class="fixed left-[12%] top-0 bottom-0 border-l border-dashed border-white/[0.03] z-0 pointer-events-none" />
    <div class="fixed right-[12%] top-0 bottom-0 border-l border-dashed border-white/[0.03] z-0 pointer-events-none" />

    <div class="fixed top-[35%] left-[20%] right-[20%] h-[2px] z-0 pointer-events-none bg-white/[0.04]" />
    <div class="fixed left-[30%] top-[20%] bottom-[20%] w-[2px] z-0 pointer-events-none bg-white/[0.03]" />
    <SkillCloud />
    <div class="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
      <div class="absolute top-[15%] -left-[10%] -right-[10%] h-0 flex items-center" style="transform: rotate(-12deg);"><span class="text-[3.5vw] font-mono font-bold text-white/[0.035] tracking-[0.6em] whitespace-nowrap strip-slide-1">TECHNICAL ARTIST&nbsp;&nbsp;&nbsp;TECHNICAL ARTIST&nbsp;&nbsp;&nbsp;TECHNICAL ARTIST&nbsp;&nbsp;&nbsp;TECHNICAL ARTIST&nbsp;&nbsp;&nbsp;TECHNICAL ARTIST&nbsp;&nbsp;&nbsp;TECHNICAL ARTIST</span></div>
      <div class="absolute top-[85%] -left-[10%] -right-[10%] h-0 flex items-center" style="transform: rotate(12deg);"><span class="text-[3.5vw] font-mono font-bold text-white/[0.03] tracking-[0.6em] whitespace-nowrap strip-slide-2">TECHNICAL DIRECTOR&nbsp;&nbsp;&nbsp;TECHNICAL DIRECTOR&nbsp;&nbsp;&nbsp;TECHNICAL DIRECTOR&nbsp;&nbsp;&nbsp;TECHNICAL DIRECTOR&nbsp;&nbsp;&nbsp;TECHNICAL DIRECTOR&nbsp;&nbsp;&nbsp;TECHNICAL DIRECTOR</span></div>
    </div>
    <div class="fixed top-1/2 left-[53%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
      <div class="flex items-center gap-3 md:gap-5 text-[16vw] font-black leading-none tracking-[0.4em]" style="font-family: 'Cinzel', serif;">
        <span style="color: #a5b4fc; opacity: 0.08; text-shadow: -2px 0 rgba(255,60,60,0.12), 2px 0 rgba(60,180,255,0.12);">J</span><span style="color: #c4b5fd; opacity: 0.10; transform: translateY(-6px); text-shadow: -2px 0 rgba(255,60,60,0.15), 2px 0 rgba(60,180,255,0.15);">U</span><span style="color: #a5b4fc; opacity: 0.08; text-shadow: -2px 0 rgba(255,60,60,0.12), 2px 0 rgba(60,180,255,0.12);">S</span><span style="color: #c4b5fd; opacity: 0.10; transform: translateY(4px); text-shadow: -2px 0 rgba(255,60,60,0.15), 2px 0 rgba(60,180,255,0.15);">L</span><span style="color: #a5b4fc; opacity: 0.08; text-shadow: -2px 0 rgba(255,60,60,0.12), 2px 0 rgba(60,180,255,0.12);">I</span><span style="color: #c4b5fd; opacity: 0.12; transform: translateY(-2px); text-shadow: -2px 0 rgba(255,60,60,0.15), 2px 0 rgba(60,180,255,0.15);">U</span>
      </div>
    </div>
    <NavDots />

    <button
      @click="toggleLocale"
      class="fixed top-4 md:top-6 right-6 z-50 flex items-center gap-1.5 px-2.5 py-2 rounded-full border backdrop-blur-sm transition-all duration-200 group text-white/40 hover:text-white/60"
      :style="locale === 'zh' ? { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)' } : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)' }"
    >
      <svg class="w-3.5 h-3.5 flex-shrink-0 opacity-50 group-hover:opacity-70" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10"/></svg>
      <span class="text-[10px] md:text-xs font-mono tracking-wider">{{ locale === 'zh' ? '中' : 'EN' }}</span>
    </button>

    <main class="relative z-[2]">
      <RouterView v-slot="{ Component }">
        <Transition :css="false" @before-enter="($event) => createTransition().onBeforeEnter($event)" @enter="($event, $done) => createTransition().onEnter($event, $done)" @leave="($event, $done) => createTransition().onLeave($event, $done)" mode="out-in">
          <component :is="Component" @particle-pause="onParticlePause" @particle-resume="onParticleResume" @preview-image="onPreviewImage" />
        </Transition>
      </RouterView>
    </main>

    <AudioPlayer />
    <ImageViewer :src="previewSrc" :alt="previewAlt" :show="showPreview" @close="closePreview" />
    <div class="fixed bottom-3 right-6 z-50 text-[9px] font-mono tracking-widest text-white/10 select-none">jusliu &middot; 2026</div>
  </div>
</template>

<style>
.brand-breathe { animation: brandBreathe 8s ease-in-out infinite; }
@keyframes brandBreathe { 0%, 50%, 100% { opacity: 0.04; } 25%, 75% { opacity: 0.12; } }
.strip-slide-1 { animation: slideStrip1 30s linear infinite; }
.strip-slide-2 { animation: slideStrip2 30s linear infinite; }
@keyframes slideStrip1 { from { transform: rotate(-12deg) translateX(0%); } to { transform: rotate(-12deg) translateX(-50%); } }
@keyframes slideStrip2 { from { transform: rotate(12deg) translateX(-50%); } to { transform: rotate(12deg) translateX(0%); } }
</style>
