<script setup lang="ts">
import Counter from './Counter.vue'

type PlaceValue = number | '.'

defineProps<{
  value: number
  places?: PlaceValue[]
}>()
</script>

<template>
  <Counter
    :value="value"
    :places="places"
    :font-size="28"
    :font-weight="700"
    :gap="1"
    :horizontal-padding="0"
    :border-radius="0"
    :gradient-height="0"
    text-color="#5a5d5f"
  />
</template>
