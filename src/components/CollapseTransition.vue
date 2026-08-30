<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <Transition name="collapse">
    <div v-if="show" class="collapse-row">
      <slot />
    </div>
  </Transition>
</template>
