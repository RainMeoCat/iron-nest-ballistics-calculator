<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

defineProps<{
  modelValue: string | number
  options: readonly (string | number)[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

function choose(option: string | number, event: MouseEvent) {
  emit('update:modelValue', option)
  ;(event.currentTarget as HTMLElement).blur()
}
</script>

<template>
  <div class="dropdown w-full">
    <div
      tabindex="0"
      role="button"
      class="btn w-full justify-between btn-outline font-normal btn-lg"
    >
      {{ modelValue }}
      <ChevronDown class="h-4 w-4 opacity-60" />
    </div>
    <ul
      tabindex="0"
      class="menu dropdown-content z-10 mt-2 max-h-72 w-full flex-nowrap overflow-y-auto rounded-box bg-base-200 p-2 shadow-2xl"
    >
      <li v-for="option in options" :key="option">
        <button
          type="button"
          class="justify-center"
          :class="{ active: option === modelValue }"
          @click="choose(option, $event)"
        >
          {{ option }}
        </button>
      </li>
    </ul>
  </div>
</template>
