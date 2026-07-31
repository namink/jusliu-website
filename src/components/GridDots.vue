<template>
  <svg class="fixed inset-0 z-0 w-full h-full pointer-events-none opacity-[0.08]">
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="#c4b5fd" />
        <circle cx="0" cy="0" r="0.8" fill="#88a8ff" opacity="0.4" />
      </pattern>
      <pattern id="bigdots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="3" fill="#c4b5fd" opacity="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
    <rect width="100%" height="100%" fill="url(#bigdots)" />
  </svg>
</template>
