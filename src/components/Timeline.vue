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
      'Sequence 动画与 360 全景图输出'
    ]
  }
]

const visibleItems = ref<number[]>([])

onMounted(() => {
  items.forEach((_, i) => {
    setTimeout(() => visibleItems.value.push(i), i * 150)
  })
})
</script>

<template>
  <div class="relative">
    <div class="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-400/60 via-white/10 to-transparent md:left-1/2 md:-translate-x-px" />

    <div
      v-for="(item, i) in items"
      :key="i"
      class="relative mb-8 md:mb-12 last:mb-0 transition-all duration-700"
      :class="[
        visibleItems.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        i % 2 === 0 ? 'md:pr-[calc(50%+2rem)] md:text-right' : 'md:pl-[calc(50%+2rem)] md:text-left'
      ]"
    >
      <div class="absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 bg-[#0a0a1a] z-10"
        :class="[
          i % 2 === 0 ? 'md:left-1/2 md:-translate-x-1/2' : 'md:left-1/2 md:-translate-x-1/2',
          'border-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]'
        ]"
      />

      <div class="pl-8 md:pl-0">
        <span class="text-xs font-mono text-indigo-400/80 tracking-wider">{{ item.period }}</span>
        <h4 class="text-base md:text-lg font-semibold text-white mt-1">{{ item.role }}</h4>
        <p class="text-sm text-white/50 font-medium">{{ item.company }}</p>
        <ul class="mt-2 space-y-1">
          <li
            v-for="(d, di) in item.details"
            :key="di"
            class="text-xs md:text-sm text-white/40"
          >
            {{ d }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
