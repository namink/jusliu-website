<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TimelineItem {
  period: string
  role: string
  company: string
  details: string[]
}

const items: TimelineItem[] = [
  {
    period: '2025.12 - 至今',
    role: 'TD (技术指导)',
    company: '长沙神漫文化科技有限公司',
    details: [
      'DCC 软件工具开发与流程优化',
      'Python/PyQt 管线工具开发',
      'Deadline 渲染农场管理',
      'AI 生成软件前端界面开发'
    ]
  },
  {
    period: '2023.10 - 2025.11',
    role: 'UE 美术',
    company: '湖南极也视界文化艺术有限公司',
    details: [
      '三渲二风格材质研发',
      'UE 场景搭建与渲染',
      'AI 数字人流程研发',
      '参与哪吒、熊出没、王者荣耀 CG 等项目'
    ]
  },
  {
    period: '2023.02 - 2023.06',
    role: '平面设计师助理',
    company: '有只蚂蚁品牌设计有限公司',
    details: [
      '产品图建模渲染',
      '海报与详情页设计'
    ]
  },
  {
    period: '2022.06 - 2023.01',
    role: 'UE 美术',
    company: '北京原子比特科技有限公司',
    details: [
      '根据分镜搭建 UE 白盒场景',
      '灯光、雾效、后处理氛围塑造',
      'Sequence 动画与 360 全景序列帧图输出'
    ]
  }
]

const visible = ref(false)

onMounted(() => {
  setTimeout(() => visible.value = true, 300)
})
</script>

<template>
  <div class="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="min-w-[240px] md:min-w-[260px] rounded-xl border p-5 flex-shrink-0 transition-all duration-700"
      :class="[
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        i === 0
          ? 'bg-indigo-500/[0.04] border-indigo-400/20'
          : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
      ]"
      :style="{ transitionDelay: `${i * 100}ms` }"
    >
      <span class="text-[10px] md:text-xs font-mono tracking-widest text-indigo-400/70 uppercase">{{ item.period }}</span>
      <h4 class="text-sm md:text-base font-semibold text-white mt-2">{{ item.role }}</h4>
      <p class="text-xs md:text-sm text-white/40 mt-1 mb-3">{{ item.company }}</p>
      <div class="w-8 h-px bg-gradient-to-r from-indigo-400/40 to-transparent mb-3" />
      <ul class="space-y-1.5">
        <li
          v-for="(d, di) in item.details"
          :key="di"
          class="text-[11px] md:text-xs text-white/35 leading-relaxed flex items-start gap-1.5"
        >
          <span class="text-indigo-400/40 mt-0.5 text-[8px]">●</span>
          {{ d }}
        </li>
      </ul>
    </div>
  </div>
</template>
