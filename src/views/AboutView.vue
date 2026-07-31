<script setup lang="ts">
import Timeline from '@/components/Timeline.vue'
import SkillBar from '@/components/SkillBar.vue'
import { useScrollNav } from '@/composables/useScrollNav'
import { useI18n } from '@/composables/useI18n'

useScrollNav()
const { t } = useI18n()
</script>

<template>
  <section class="min-h-screen w-full flex items-center justify-center relative px-6 py-20 md:py-24">
    <div class="w-full max-w-5xl mx-auto">
      <div class="text-center mb-12 md:mb-16">
        <p class="text-[10px] md:text-xs font-mono tracking-[0.3em] text-indigo-400/60 mb-2">{{ t('aboutTitle') }} / {{ t('aboutSub') }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
        <div class="lg:pr-8">
          <div class="space-y-6 text-white/50 text-sm md:text-base leading-relaxed border-l border-white/[0.04] pl-5">
            <p class="pb-5 border-b border-white/[0.03]">{{ t('bio1') }}</p>
            <p class="pb-5 border-b border-white/[0.03]">{{ t('bio2') }}</p>
            <p class="pb-5 border-b border-white/[0.03]">{{ t('bio3') }}</p>
            <p>{{ t('bio4') }}</p>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <a href="mailto:conti_717@163.com"
              class="text-xs md:text-sm px-5 py-2.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 hover:bg-indigo-500/20 transition-all duration-300 inline-flex items-center gap-2"
            >
              conti_717@163.com
            </a>
            <a href="tel:18070154965"
              class="text-xs md:text-sm px-5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/20 transition-all duration-300"
            >
              18070154965
            </a>
          </div>
        </div>

        <div class="lg:pl-8 lg:border-l lg:border-white/[0.06]">
          <SkillBar />
        </div>
      </div>

      <div class="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/[0.04]">
        <h3 class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-8 text-center md:text-left">
          Work Experience
        </h3>
        <Timeline />
      </div>

      <div class="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/[0.04]">
        <div class="text-center">
          <p class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-4">{{ t('education') }}</p>
          <h4 class="text-lg text-white font-medium">{{ t('eduSchool') }}</h4>
          <p class="text-sm text-white/40 mt-1">{{ t('eduDegree') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
