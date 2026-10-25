<script setup lang="ts">
import ContactActions from '@/components/ContactActions.vue'
import Timeline from '@/components/Timeline.vue'
import SkillBar from '@/components/SkillBar.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <section class="min-h-screen w-full flex items-center justify-center relative px-6 pt-[10vh] pb-24">
    <div class="w-full max-w-5xl mx-auto">
      <div class="text-center mb-12 md:mb-16">
        <h1 class="text-3xl md:text-4xl font-semibold text-white">{{ t('aboutSub') }}</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div class="lg:pr-8">
          <div class="space-y-6 text-white/75 text-sm md:text-base leading-relaxed border-l border-white/[0.04] pl-5">
            <p class="pb-5 border-b border-white/[0.03]">{{ t('bio1') }}</p>
            <p class="pb-5 border-b border-white/[0.03]">{{ t('bio2') }}</p>
            <p class="pb-5 border-b border-white/[0.03]">{{ t('bio3') }}</p>
            <p>{{ t('bio4') }}</p>
          </div>

          <ContactActions />
        </div>

        <div class="lg:pl-8 lg:border-l lg:border-white/[0.06]">
          <SkillBar />
        </div>
      </div>

      <div class="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/[0.04]">
        <h3 class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-8 text-center md:text-left">
          {{ t('workExp') }}
        </h3>
        <Timeline />
      </div>

      <div class="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/[0.04]">
        <div class="text-center">
          <p class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-4">{{ t('education') }}</p>
          <h4 class="text-lg text-white font-medium">{{ t('eduSchool') }}</h4>
          <p class="text-sm text-white/65 mt-1">{{ t('eduDegree') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
