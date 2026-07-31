<template>
  <div class="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
    <div class="absolute top-[28%] -left-[10%] -right-[10%] h-0 flex items-center" style="transform: rotate(-7deg);">
      <span class="text-[2.5vw] font-bold text-white/[0.035] tracking-[0.5em] whitespace-nowrap cloud-slide-1">UE5&nbsp;&nbsp;Maya&nbsp;&nbsp;Python&nbsp;&nbsp;PyQt&nbsp;&nbsp;SpeedTree&nbsp;&nbsp;Gaea&nbsp;&nbsp;UE5&nbsp;&nbsp;Maya&nbsp;&nbsp;Python&nbsp;&nbsp;PyQt&nbsp;&nbsp;SpeedTree&nbsp;&nbsp;Gaea</span>
    </div>
    <div class="absolute top-[45%] -left-[10%] -right-[10%] h-0 flex items-center" style="transform: rotate(5deg);">
      <span class="text-[2.2vw] font-bold text-white/[0.03] tracking-[0.4em] whitespace-nowrap cloud-slide-2">ZBrush&nbsp;&nbsp;SP&nbsp;&nbsp;WorldCreator&nbsp;&nbsp;ComfyUI&nbsp;&nbsp;PS&nbsp;&nbsp;PR&nbsp;&nbsp;ZBrush&nbsp;&nbsp;SP&nbsp;&nbsp;WorldCreator&nbsp;&nbsp;ComfyUI&nbsp;&nbsp;PS&nbsp;&nbsp;PR</span>
    </div>
    <div class="absolute top-[63%] -left-[10%] -right-[10%] h-0 flex items-center" style="transform: rotate(-9deg);">
      <span class="text-[2vw] font-bold text-white/[0.03] tracking-[0.5em] whitespace-nowrap cloud-slide-3">AE&nbsp;&nbsp;Deadline&nbsp;&nbsp;Git&nbsp;&nbsp;rez&nbsp;&nbsp;C++&nbsp;&nbsp;C#&nbsp;&nbsp;AE&nbsp;&nbsp;Deadline&nbsp;&nbsp;Git&nbsp;&nbsp;rez&nbsp;&nbsp;C++&nbsp;&nbsp;C#</span>
    </div>
  </div>
</template>

<style scoped>
.cloud-slide-1 {
  animation: cloud1 16s ease-in-out infinite alternate;
}
.cloud-slide-2 {
  animation: cloud2 18s ease-in-out infinite alternate;
}
.cloud-slide-3 {
  animation: cloud3 20s ease-in-out infinite alternate;
}
@keyframes cloud1 {
  from { transform: rotate(-7deg) translateX(-4%); }
  to   { transform: rotate(-7deg) translateX(4%); }
}
@keyframes cloud2 {
  from { transform: rotate(5deg) translateX(4%); }
  to   { transform: rotate(5deg) translateX(-4%); }
}
@keyframes cloud3 {
  from { transform: rotate(-9deg) translateX(-5%); }
  to   { transform: rotate(-9deg) translateX(5%); }
}
</style>
