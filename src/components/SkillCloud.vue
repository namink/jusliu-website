<script setup lang="ts">
import { ref, onMounted } from 'vue'

const tags = [
  'UE5', 'Maya', 'Python', 'PyQt',
  'SpeedTree', 'Gaea', 'ZBrush', 'SP',
  'WorldCreator', 'ComfyUI', 'PS', 'PR',
  'AE', 'Deadline', 'Git', 'rez',
  'C++', 'C#'
]

const visible = ref<number[]>([])

onMounted(() => {
  tags.forEach((_, i) => {
    setTimeout(() => visible.value.push(i), 300 + i * 40)
  })
})
</script>

<template>
  <div class="flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-3xl mx-auto">
    <span
      v-for="(t, i) in tags"
      :key="t"
      class="skill-pill text-[10px] md:text-[11px] px-2.5 py-1 rounded-md border backdrop-blur-sm transition-all duration-500 select-none"
      :class="[
        visible.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
        'bg-white/[0.01] border-white/[0.04] text-white/30 hover:border-indigo-400/20 hover:text-indigo-300'
      ]"
      :style="{
        animationDelay: `${i * 0.2}s`,
        animationDuration: `${2.5 + (i % 3) * 0.6}s`
      }"
    >
      {{ t }}
    </span>
  </div>
</template>
