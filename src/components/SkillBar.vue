<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Skill {
  name: string
  level: number
}

const skills: Skill[] = [
  { name: 'Unreal Engine 5/4', level: 95 },
  { name: '需求分析 & 方案制定', level: 85 },
  { name: 'Maya', level: 85 },
  { name: 'Python / AI 辅助开发', level: 85 },
  { name: 'SpeedTree', level: 80 },
  { name: 'ComfyUI / AI 流程', level: 80 },
  { name: 'Substance Painter', level: 75 },
  { name: 'Gaea / WorldCreator', level: 75 },
  { name: 'Deadline 渲染农场', level: 75 },
  { name: 'Git / rez 包管理', level: 70 },
  { name: 'ZBrush', level: 65 }
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

const barStyle = (i: number) => ({
  width: revealed.value ? `${skills[i].level}%` : '0%',
  transitionDelay: `${i * 60}ms`,
  transitionDuration: '1.2s',
  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
})
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-5">
      <h3 class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase">Core Skills</h3>
      <div class="space-y-3">
        <div v-for="(s, i) in skills" :key="s.name" class="group">
          <div class="flex justify-between items-baseline mb-1.5">
            <span class="text-sm text-white/70 group-hover:text-white transition-colors">{{ s.name }}</span>
            <span class="text-xs font-mono text-white/30">{{ s.level }}%</span>
          </div>
          <div class="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
              :style="barStyle(i)"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-4">Tools & Tech</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="t in tools"
          :key="t"
          class="text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] text-white/50 border border-white/[0.06] hover:border-indigo-400/30 hover:text-indigo-300 transition-all duration-300"
        >
          {{ t }}
        </span>
      </div>
    </div>

    <div>
      <h3 class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-4">Language Foundation</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="t in languageBasis"
          :key="t"
          class="text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] text-white/30 border border-white/[0.04]"
        >
          {{ t }}
        </span>
      </div>
    </div>
  </div>
</template>
