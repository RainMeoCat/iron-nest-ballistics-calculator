<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { lockBodyScroll, unlockBodyScroll } from '../composables/useBodyScrollLock'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
let isLocked = false

function syncOpenState(isOpen: boolean) {
  const dialog = dialogRef.value
  if (!dialog)
    return
  if (isOpen && !dialog.open) {
    dialog.showModal()
    lockBodyScroll()
    isLocked = true
  }
  else if (!isOpen && dialog.open) {
    dialog.close()
  }
}

onMounted(() => syncOpenState(props.open))
watch(() => props.open, syncOpenState)

function handleClose() {
  if (isLocked) {
    unlockBodyScroll()
    isLocked = false
  }
  emit('update:open', false)
}

onBeforeUnmount(() => {
  if (isLocked) {
    unlockBodyScroll()
    isLocked = false
  }
})
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
