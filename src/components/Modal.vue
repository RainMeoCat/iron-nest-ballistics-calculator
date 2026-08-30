<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

function syncOpenState(isOpen: boolean) {
  const dialog = dialogRef.value
  if (!dialog)
    return
  if (isOpen && !dialog.open)
    dialog.showModal()
  else if (!isOpen && dialog.open)
    dialog.close()
}

onMounted(() => syncOpenState(props.open))
watch(() => props.open, syncOpenState)

function handleClose() {
  emit('update:open', false)
}
</script>

<template>
  <dialog ref="dialogRef" class="modal" @close="handleClose">
    <div class="modal-box">
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
