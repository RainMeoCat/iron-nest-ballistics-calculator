<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div
    class="relative flex items-center justify-center overflow-hidden rounded-2xl border-2 border-[#5a5d5f] h-14 md:h-20"
  >
    <slot />
    <span
      class="pointer-events-none absolute -bottom-1 left-1 text-lg font-black whitespace-nowrap text-[#5a5d5f] italic [font-synthesis:style] select-none md:text-xl"
    >
      {{ label }}
    </span>
  </div>
</template>
