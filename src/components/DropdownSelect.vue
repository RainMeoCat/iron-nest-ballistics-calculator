<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  modelValue: string | number
  options: readonly (string | number)[]
}>()

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
  emit('update:modelValue', option)
  close()
}

function handleDocumentClick(event: MouseEvent) {
  if (open.value && rootRef.value && !rootRef.value.contains(event.target as Node))
    close()
}

function handleKeydown(event: KeyboardEvent) {
  if (open.value && event.key === 'Escape')
    close()
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div ref="rootRef" class="dropdown w-full">
    <button
      type="button"
      class="btn w-full justify-between btn-outline font-normal btn-lg"
      @click="toggle"
    >
      {{ modelValue }}
      <ChevronDown class="h-4 w-4 opacity-60" />
    </button>
    <Transition name="dropdown-fade">
      <ul
        v-show="open"
        class="menu dropdown-content max-h-72 w-full flex-nowrap overflow-y-auto rounded-2xl bg-base-200 p-2 shadow-2xl"
      >
        <li v-for="option in options" :key="option">
          <button
            type="button"
            class="justify-center"
            :class="{ active: option === modelValue }"
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
