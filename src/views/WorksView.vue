<script setup lang="ts">
import { ref, computed } from 'vue'
import { works, categories } from '@/data/works'
import WorkCard from '@/components/WorkCard.vue'

const emit = defineEmits<{
  particlePause: []
  particleResume: []
}>()

const activeCategory = ref('')

const filteredWorks = computed(() =>
  activeCategory.value
    ? works.filter(w => w.category === activeCategory.value)
    : works
)
</script>

<template>
  <section class="min-h-screen w-full flex flex-col items-center justify-center relative px-6 py-20 md:py-24">
    <div class="w-full max-w-6xl mx-auto">
      <div class="text-center mb-12 md:mb-16">
        <p class="text-xs md:text-sm font-mono tracking-[0.3em] text-indigo-400 mb-4">PORTFOLIO</p>
        <h2 class="text-3xl md:text-5xl font-bold text-white">作品集</h2>
        <p class="text-sm md:text-base text-white/40 mt-4">点击带 VIDEO 标识的卡片可直接播放演示</p>
      </div>

      <div class="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
        <button
          @click="activeCategory = ''"
          class="text-xs md:text-sm px-4 py-2 rounded-full border transition-all duration-300"
          :class="activeCategory === ''
            ? 'bg-indigo-500/20 border-indigo-400/40 text-indigo-300'
            : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/20 hover:text-white/70'"
        >
          全部
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="text-xs md:text-sm px-4 py-2 rounded-full border transition-all duration-300"
          :class="activeCategory === cat
            ? 'bg-indigo-500/20 border-indigo-400/40 text-indigo-300'
            : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/20 hover:text-white/70'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <WorkCard
          v-for="(work, i) in filteredWorks"
          :key="work.id"
          :work="work"
          :index="i"
          @particle-pause="emit('particlePause')"
          @particle-resume="emit('particleResume')"
        />
      </div>
    </div>
  </section>
</template>
