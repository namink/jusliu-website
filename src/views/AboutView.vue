<script setup lang="ts">
import Timeline from '@/components/Timeline.vue'
import SkillBar from '@/components/SkillBar.vue'
import { useScrollNav } from '@/composables/useScrollNav'
import { useI18n } from '@/composables/useI18n'

useScrollNav()
const { t } = useI18n()
</script>

<template>
  <section class="min-h-screen w-full flex items-center justify-center relative px-6 pt-[10vh] pb-24">
    <div class="w-full max-w-5xl mx-auto">
      <div class="text-center mb-12 md:mb-16">
        <p class="text-[10px] md:text-xs font-mono tracking-[0.3em] text-indigo-400/60 mb-2">{{ t('aboutTitle') }} / {{ t('aboutSub') }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div class="lg:pr-8">
          <div class="space-y-6 text-white/50 text-sm md:text-base leading-relaxed border-l border-white/[0.04] pl-5">
            <p class="pb-5 border-b border-white/[0.03]">{{ t('bio1') }}</p>
            <p class="pb-5 border-b border-white/[0.03]">{{ t('bio2') }}</p>
            <p class="pb-5 border-b border-white/[0.03]">{{ t('bio3') }}</p>
            <p>{{ t('bio4') }}</p>
          </div>

          <div class="mt-8 flex items-center gap-3">
            <a href="mailto:conti_717@163.com" title="conti_717@163.com" class="w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.06] text-indigo-400/50 hover:text-indigo-300 hover:border-indigo-400/30 transition-all duration-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/></svg>
            </a>
            <span title="WeChat: Jusliu" class="w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.06] text-white/30 hover:text-white/50 hover:border-white/[0.12] transition-all duration-200 cursor-default">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </span>
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
