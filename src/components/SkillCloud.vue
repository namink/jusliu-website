<template>
  <div class="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
    <div class="absolute top-[25%] -left-[10%] -right-[10%] h-0 flex items-center" style="transform: rotate(-8deg);">
      <span class="text-[1.3vw] font-light text-white/[0.035] tracking-[0.6em] whitespace-nowrap cloud-slide-1">Unreal Engine&nbsp;&nbsp;Maya&nbsp;&nbsp;Python&nbsp;&nbsp;PyQt&nbsp;&nbsp;SpeedTree&nbsp;&nbsp;Gaea&nbsp;&nbsp;Unreal Engine&nbsp;&nbsp;Maya&nbsp;&nbsp;Python&nbsp;&nbsp;PyQt&nbsp;&nbsp;SpeedTree&nbsp;&nbsp;Gaea</span>
    </div>
    <div class="absolute top-[42%] -left-[10%] -right-[10%] h-0 flex items-center" style="transform: rotate(-8deg);">
      <span class="text-[1.1vw] font-light text-white/[0.03] tracking-[0.6em] whitespace-nowrap cloud-slide-2">ZBrush&nbsp;&nbsp;Substance Painter&nbsp;&nbsp;WorldCreator&nbsp;&nbsp;ComfyUI&nbsp;&nbsp;Photoshop&nbsp;&nbsp;Premiere&nbsp;&nbsp;ZBrush&nbsp;&nbsp;Substance Painter&nbsp;&nbsp;WorldCreator&nbsp;&nbsp;ComfyUI&nbsp;&nbsp;Photoshop&nbsp;&nbsp;Premiere</span>
    </div>
    <div class="absolute top-[60%] -left-[10%] -right-[10%] h-0 flex items-center" style="transform: rotate(-8deg);">
      <span class="text-[1.0vw] font-light text-white/[0.03] tracking-[0.6em] whitespace-nowrap cloud-slide-3">After Effects&nbsp;&nbsp;Deadline&nbsp;&nbsp;Git&nbsp;&nbsp;rez&nbsp;&nbsp;C++&nbsp;&nbsp;C#&nbsp;&nbsp;After Effects&nbsp;&nbsp;Deadline&nbsp;&nbsp;Git&nbsp;&nbsp;rez&nbsp;&nbsp;C++&nbsp;&nbsp;C#</span>
    </div>
  </div>
</template>

<style scoped>
.cloud-slide-1 { animation: cloud1 16s ease-in-out infinite alternate; }
.cloud-slide-2 { animation: cloud2 18s ease-in-out infinite alternate; }
.cloud-slide-3 { animation: cloud3 20s ease-in-out infinite alternate; }
@keyframes cloud1 { from { transform: rotate(-8deg) translateX(-4%); } to { transform: rotate(-8deg) translateX(4%); } }
@keyframes cloud2 { from { transform: rotate(-8deg) translateX(4%); } to { transform: rotate(-8deg) translateX(-4%); } }
@keyframes cloud3 { from { transform: rotate(-8deg) translateX(-5%); } to { transform: rotate(-8deg) translateX(5%); } }
</style>
