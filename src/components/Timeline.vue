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

const reverseItems = [...items].reverse()
const visible = ref(false)

onMounted(() => {
  setTimeout(() => visible.value = true, 300)
})
</script>

<template>
  <div class="hidden md:block relative">
    <div class="grid grid-cols-4 gap-5 relative pt-24 pb-2">
      <div
        v-for="(item, i) in reverseItems"
        :key="i"
        class="flex flex-col items-center relative transition-all duration-700"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        :style="{ transitionDelay: `${i * 100}ms` }"
      >
        <div
          class="w-full rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5"
          :class="[
            i === reverseItems.length - 1
              ? 'bg-indigo-500/[0.05] border-indigo-400/25'
              : 'bg-white/[0.02] border-white/[0.05] hover:border-white/10'
          ]"
        >
          <h4 class="text-sm font-semibold text-white leading-tight">{{ item.role }}</h4>
          <p class="text-[11px] text-white/35 mt-0.5">{{ item.company }}</p>
          <div class="w-5 h-px bg-gradient-to-r from-indigo-400/30 to-transparent my-2" />
          <ul class="space-y-0.5">
            <li
              v-for="(d, di) in item.details"
              :key="di"
              class="text-[10px] text-white/25 leading-relaxed"
            >
              · {{ d }}
            </li>
          </ul>
        </div>

        <div class="w-px h-4 border-l border-dashed border-white/10 my-1" />

        <div
          class="w-2.5 h-2.5 rounded-full border-2 z-10 flex-shrink-0"
          :class="[
            i === reverseItems.length - 1
              ? 'bg-indigo-400 border-indigo-400 w-3.5 h-3.5 timeline-dot-active'
              : 'bg-[#0f0f1a] border-white/20'
          ]"
        />

        <span class="text-[10px] font-mono tracking-wider text-white/25 mt-1.5 whitespace-nowrap">{{ item.period }}</span>
      </div>
    </div>

    <div class="absolute left-[10%] right-[10%] top-[calc(100%-6px)] h-[2px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
  </div>

  <div class="md:hidden relative">
    <div class="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-400/50 via-white/10 to-transparent" />
    <div
      v-for="(item, i) in items"
      :key="i"
      class="relative mb-7 last:mb-0 transition-all duration-700"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      :style="{ transitionDelay: `${i * 100}ms` }"
    >
      <div class="absolute left-0 top-2 w-3 h-3 rounded-full border-2 bg-[#0f0f1a] z-10"
        :class="i === 0 ? 'border-indigo-400 bg-indigo-400 timeline-dot-active' : 'border-indigo-400/50'"
      />
      <div class="pl-7">
        <span class="text-[10px] font-mono text-indigo-400/70 tracking-wider">{{ item.period }}</span>
        <h4 class="text-sm font-semibold text-white mt-0.5">{{ item.role }}</h4>
        <p class="text-xs text-white/35">{{ item.company }}</p>
        <ul class="mt-1.5 space-y-0.5">
          <li v-for="(d, di) in item.details" :key="di" class="text-[10px] text-white/25">· {{ d }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
