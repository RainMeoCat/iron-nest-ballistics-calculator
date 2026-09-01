<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const isScrollLocked = useScrollLock(document.body)

function syncOpenState(isOpen: boolean) {
  const dialog = dialogRef.value
  if (!dialog)
    return
  if (isOpen && !dialog.open) {
    dialog.showModal()
    isScrollLocked.value = true
  }
  else if (!isOpen && dialog.open) {
    dialog.close()
  }
}

onMounted(() => syncOpenState(props.open))
watch(() => props.open, syncOpenState)

function handleClose() {
  isScrollLocked.value = false
  emit('update:open', false)
}
</script>

<template>
  <dialog ref="dialogRef" class="modal" @close="handleClose">
    <div class="modal-box plate">
      <slot />
      <div v-if="$slots.actions" class="modal-action">
        <slot name="actions" />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button type="submit">
        close
      </button>
    </form>
  </dialog>
</template>
