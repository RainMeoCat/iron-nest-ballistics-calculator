<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string | number
  options: readonly (string | number)[]
  optionDisabled?: (option: string | number) => boolean
}>(), {
  optionDisabled: () => false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function choose(option: string | number) {
  if (props.optionDisabled(option))
    return
  emit('update:modelValue', option)
  close()
}

onClickOutside(rootRef, close)
onKeyStroke('Escape', close)
</script>

<template>
  <div ref="rootRef" class="dropdown w-full">
    <button
      type="button"
      class="btn w-full justify-between btn-input font-normal btn-lg"
      @click="toggle"
    >
      {{ modelValue }}
      <ChevronDown class="h-4 w-4 opacity-60" />
    </button>
    <Transition name="dropdown-fade">
      <ul
        v-show="open"
        class="menu dropdown-content max-h-72 w-full flex-nowrap overflow-y-auto rounded-lg bg-base-100 p-2"
      >
        <li v-for="option in options" :key="option">
          <button
            type="button"
            class="justify-center"
            :class="{ active: option === modelValue }"
            :disabled="optionDisabled(option)"
            @click="choose(option)"
          >
            {{ option }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
