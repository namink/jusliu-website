<template>
  <svg class="fixed inset-0 z-0 w-full h-full pointer-events-none opacity-[0.05]">
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="#c4b5fd" />
        <circle cx="20" cy="20" r="0.8" fill="#88a8ff" opacity="0.6" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
</template>
