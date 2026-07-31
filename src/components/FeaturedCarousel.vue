<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const works = [
  {
    title: 'AI 数字内容生成平台',
    desc: '从 0 到 1 构建，节点式工作流 + 3D 预览 + PBR 编辑',
    category: 'AI 平台',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/ai-platform/batch-modes.jpg'
  },
  {
    title: '导演台 · 3D 场景编辑器',
    desc: '实时自由视角 + 相机监控 + 时间线动画',
    category: 'AI 平台',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/director3d/timeline.jpg'
  },
  {
    title: '哪吒之魔童闹海',
    desc: '电影项目资产制作、特效及 TD 技术支持',
    category: '项目支持',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/nezha.jpg'
  },
  {
    title: 'Free Fire 游戏买量动画',
    desc: '毛发解算 + 动画绑定 TD 技术指导',
    category: '项目支持',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/freefire.jpg'
  }
]

const current = ref(0)
const scrollRef = ref<HTMLDivElement>()
let timer = 0

function next() {
  current.value = (current.value + 1) % works.length
  if (scrollRef.value) {
    scrollRef.value.scrollTo({ left: current.value * 272, behavior: 'smooth' })
  }
}

onMounted(() => {
  timer = window.setInterval(next, 4000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="relative mx-auto max-w-lg md:max-w-2xl">
    <div ref="scrollRef" class="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth">
      <div
        v-for="(w, i) in works"
        :key="w.title"
        class="flex-shrink-0 w-[240px] md:w-[260px] snap-center rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] cursor-pointer"
        @click="current = i"
      >
        <div class="aspect-[16/9] overflow-hidden">
          <img :src="w.thumbnail" :alt="w.title" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="p-3">
          <span class="text-[9px] md:text-[10px] font-mono tracking-wider text-indigo-400/70 uppercase">{{ w.category }}</span>
          <h4 class="text-xs md:text-sm font-medium text-white mt-1 leading-tight">{{ w.title }}</h4>
          <p class="text-[10px] md:text-xs text-white/35 mt-1 line-clamp-2">{{ w.desc }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-1.5 mt-3">
      <span
        v-for="(_w, i) in works"
        :key="i"
        class="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
        :class="i === current ? 'bg-indigo-400 w-4' : 'bg-white/15 hover:bg-white/30'"
        @click="current = i; scrollRef?.scrollTo({ left: i * 272, behavior: 'smooth' })"
      />
    </div>
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
