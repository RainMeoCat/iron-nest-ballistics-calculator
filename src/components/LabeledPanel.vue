<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  tag?: 'div' | 'fieldset'
  /**
   * Content (e.g. dropdown popovers) that must be able to escape the panel
   * bounds. Clips just the label instead of the whole panel.
   */
  overflowVisible?: boolean
}>(), {
  tag: 'div',
  overflowVisible: false,
})
</script>

<template>
  <component
    :is="tag"
    class="plate relative bg-base-200 p-6 pb-18 border-gray-500 border"
    :class="{ 'overflow-hidden': !overflowVisible }"
  >
    <div v-if="overflowVisible" class="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
      <span
        class="engraved-label absolute bottom-3 left-4 text-4xl font-black whitespace-nowrap italic [font-synthesis:style] select-none md:text-5xl"
      >
        {{ label }}
      </span>
    </div>
    <span
      v-else
      class="engraved-label pointer-events-none absolute bottom-3 left-4 text-4xl font-black whitespace-nowrap italic [font-synthesis:style] select-none md:text-5xl"
    >
      {{ label }}
    </span>
    <slot />
  </component>
</template>
