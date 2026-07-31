<template>
  <svg class="fixed inset-0 z-0 w-full h-full pointer-events-none opacity-[0.03]">
    <defs>
      <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="0.8" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
</template>
