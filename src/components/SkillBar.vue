<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Skill {
  name: string
  level: number
  icon: string
}

const skills: Skill[] = [
  { name: 'Unreal Engine 5/4', level: 95, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/ue.png' },
  { name: 'Maya', level: 85, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/maya.png' },
  { name: 'Python / AI 辅助开发', level: 85, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/python.png' },
  { name: 'SpeedTree', level: 80, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/speedtree.png' },
  { name: 'ComfyUI / AI 流程', level: 80, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/comfyui.png' },
  { name: 'Substance Painter', level: 75, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/substancepainter.png' },
  { name: 'Gaea / WorldCreator', level: 75, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/gaea.png' },
  { name: 'Deadline 渲染农场', level: 75, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/deadline.png' },
  { name: 'Git / rez 包管理', level: 70, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/git.png' },
  { name: 'ZBrush', level: 65, icon: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/icons/zbrush.png' }
]

const tools = [
  'UE5', 'Maya', 'Python', 'PyQt',
  'SpeedTree', 'Gaea', 'ZBrush', 'SP',
  'WorldCreator', 'ComfyUI', 'PS', 'PR',
  'AE', 'Deadline', 'Git', 'rez',
  'C++', 'C#'
]

const languageBasis = ['C++', 'C#', 'C']

const revealed = ref(false)

onMounted(() => {
  setTimeout(() => revealed.value = true, 200)
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-5">Core Skills</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
        <div v-for="(s, i) in skills" :key="s.name" class="flex items-center gap-2.5 group">
          <div class="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img v-if="s.icon" :src="s.icon" :alt="s.name" class="w-5 h-5 object-contain opacity-85" />
            <span v-else class="text-[10px] text-indigo-400/40 font-mono group-hover:text-indigo-400/70 transition-colors">{{ s.name.charAt(0) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline mb-0.5">
              <span class="text-[11px] md:text-xs text-white/60 group-hover:text-white/80 transition-colors truncate">{{ s.name }}</span>
              <span class="text-[10px] font-mono text-white/25 ml-2">{{ s.level }}%</span>
            </div>
            <div class="h-1 bg-white/[0.04] rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                :style="{
                  width: revealed ? `${s.level}%` : '0%',
                  transitionDelay: `${i * 50}ms`,
                  transitionDuration: '1s',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-4">Tools &amp; Tech</h3>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="t in tools"
          :key="t"
          class="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.02] text-white/45 border border-white/[0.05] hover:border-indigo-400/25 hover:text-indigo-300 transition-all duration-200"
        >
          {{ t }}
        </span>
      </div>
    </div>

    <div>
      <h3 class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-4">Language Foundation</h3>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="t in languageBasis"
          :key="t"
          class="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.01] text-white/25 border border-white/[0.03]"
        >
          {{ t }}
        </span>
      </div>
    </div>
  </div>
</template>
