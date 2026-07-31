<script setup lang="ts">
import Timeline from '@/components/Timeline.vue'
import SkillBar from '@/components/SkillBar.vue'
import { useScrollNav } from '@/composables/useScrollNav'

useScrollNav()
</script>

<template>
  <section class="min-h-screen w-full flex items-center justify-center relative px-6 py-20 md:py-24">
    <div class="w-full max-w-5xl mx-auto">
      <div class="text-center mb-12 md:mb-16">
        <p class="text-[10px] md:text-xs font-mono tracking-[0.3em] text-indigo-400/60 mb-2">ABOUT / 关于</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
        <div class="lg:pr-8">
          <div class="space-y-6 text-white/50 text-sm md:text-base leading-relaxed border-l border-white/[0.04] pl-5">
            <p class="pb-5 border-b border-white/[0.03]">
              4 年影视游戏行业工作经验，涵盖 UE 技术美术、材质研发、管线工具开发，
              以及 AI 内容生成平台从 0 到 1 的构建。
            </p>
            <p class="pb-5 border-b border-white/[0.03]">
              编程基础为 C++ / C# / C，工作中主要使用 Python，
              借助 AI 辅助完成日常开发任务。具备 PyQt 桌面应用开发与 Unreal Python API 使用经验。
            </p>
            <p class="pb-5 border-b border-white/[0.03]">
              独立完成 AI 内容生成平台的完整前端界面构建，包括节点式工作流编辑器、3D 实时导演台、
              PBR 材质编辑器等功能模块。
            </p>
            <p>
              参与过哪吒之魔童闹海、熊出没之重启未来、王者荣耀 CG 动画等知名项目，
              积累了丰富的影视级资产制作与技术支持经验。
            </p>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <a href="mailto:conti_717@163.com"
              class="text-xs md:text-sm px-5 py-2.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 hover:bg-indigo-500/20 transition-all duration-300 inline-flex items-center gap-2"
            >
              conti_717@163.com
            </a>
            <a href="tel:18070154965"
              class="text-xs md:text-sm px-5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/20 transition-all duration-300"
            >
              18070154965
            </a>
          </div>
        </div>

        <div class="lg:pl-8 lg:border-l lg:border-white/[0.06]">
          <SkillBar />
        </div>
      </div>

      <div class="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/[0.04]">
        <h3 class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-8 text-center md:text-left">
          Work Experience
        </h3>
        <Timeline />
      </div>

      <div class="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/[0.04]">
        <div class="text-center">
          <p class="text-xs font-mono tracking-[0.2em] text-indigo-400/70 uppercase mb-4">Education</p>
          <h4 class="text-lg text-white font-medium">江西软件职业技术大学</h4>
          <p class="text-sm text-white/40 mt-1">计算机应用工程 · 本科 · 2019 - 2023</p>
        </div>
      </div>
    </div>
  </section>
</template>
