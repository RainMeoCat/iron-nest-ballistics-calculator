<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { MOBILE_MEDIA_QUERY } from '../constants'
import Counter from './Counter.vue'

type PlaceValue = number | '.'

defineProps<{
  value: number
  places?: PlaceValue[]
}>()

const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)
</script>

<template>
  <Counter
    :value="value"
    :places="places"
    :font-size="isMobile ? 20 : 28"
    :font-weight="700"
    :gap="1"
    :horizontal-padding="0"
    :border-radius="0"
    :gradient-height="0"
    text-color="#5a5d5f"
  />
</template>
