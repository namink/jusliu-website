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
  <div class="relative hidden md:block py-12">
    <div class="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-px bg-gradient-to-r from-indigo-400/40 via-white/10 to-indigo-400/40" />

    <div class="grid grid-cols-4 gap-4 relative">
      <div
        v-for="(item, i) in reverseItems"
        :key="i"
        class="relative flex flex-col items-center transition-all duration-700"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        :style="{ transitionDelay: `${i * 120}ms` }"
      >
        <div class="w-px h-8 border-l border-dashed" :class="i % 2 === 0 ? 'order-2 border-t-0' : 'order-0 border-t-0'" />
        <div class="w-3 h-3 rounded-full border-2 flex-shrink-0 z-10"
          :class="[
            i === 0 ? 'w-4 h-4 bg-indigo-400 border-indigo-400 timeline-dot-active' : 'bg-[#0a0a1a] border-indigo-400/60',
            i % 2 === 0 ? 'order-2 -mt-1.5' : 'order-0 -mt-1.5',
            'absolute top-1/2 -translate-y-1/2'
          ]"
          :style="{
            left: '50%',
            transform: i % 2 === 0 ? 'translate(-50%, calc(-50% - 4px))' : 'translate(-50%, calc(-50% - 4px))'
          }"
        />
        <div class="w-px h-8 border-l border-dashed" :class="i % 2 === 0 ? 'order-0' : 'order-2'" />

        <div
          class="rounded-xl border p-4 w-full transition-all duration-300 hover:-translate-y-0.5"
          :class="[
            i % 2 === 0 ? 'order-0 -mt-3' : 'order-2 -mt-3',
            i === 0
              ? 'bg-indigo-500/[0.04] border-indigo-400/20'
              : 'bg-white/[0.02] border-white/[0.05] hover:border-white/10'
          ]"
        >
          <span class="text-[10px] font-mono tracking-widest text-indigo-400/70 uppercase">{{ item.period }}</span>
          <h4 class="text-sm font-semibold text-white mt-1.5 leading-tight">{{ item.role }}</h4>
          <p class="text-xs text-white/35 mt-0.5 mb-2">{{ item.company }}</p>
          <div class="w-6 h-px bg-gradient-to-r from-indigo-400/30 to-transparent mb-2" />
          <ul class="space-y-1">
            <li
              v-for="(d, di) in item.details"
              :key="di"
              class="text-[11px] text-white/30 leading-relaxed"
            >
              · {{ d }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="md:hidden relative">
    <div class="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-400/60 via-white/10 to-transparent" />
    <div
      v-for="(item, i) in items"
      :key="i"
      class="relative mb-8 last:mb-0 transition-all duration-700"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      :style="{ transitionDelay: `${i * 100}ms` }"
    >
      <div class="absolute left-0 top-2 w-3 h-3 rounded-full border-2 bg-[#0a0a1a] z-10"
        :class="i === 0 ? 'border-indigo-400 timeline-dot-active !bg-indigo-400' : 'border-indigo-400/60'"
      />
      <div class="pl-8">
        <span class="text-xs font-mono text-indigo-400/80 tracking-wider">{{ item.period }}</span>
        <h4 class="text-base font-semibold text-white mt-1">{{ item.role }}</h4>
        <p class="text-sm text-white/40">{{ item.company }}</p>
        <ul class="mt-2 space-y-1">
          <li v-for="(d, di) in item.details" :key="di" class="text-xs text-white/30">· {{ d }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
