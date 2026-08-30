<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const hour = defineModel<string>('hour', { required: true })
const minute = defineModel<string>('minute', { required: true })
const second = defineModel<string>('second', { required: true })

const minuteInput = ref<HTMLInputElement | null>(null)
const secondInput = ref<HTMLInputElement | null>(null)

function timeFieldModel(
  raw: Ref<string>,
  max: number,
  next?: Ref<HTMLInputElement | null>,
) {
  return computed<string>({
    get: () => raw.value,
    set: (v) => {
      let digits = v.replace(/\D/g, '').slice(0, 2)
      if (digits !== '' && Number(digits) > max)
        digits = digits.slice(0, -1)
      raw.value = digits
      if (digits.length === 2)
        next?.value?.focus()
    },
  })
}

const hourModel = timeFieldModel(hour as Ref<string>, 23, minuteInput)
const minuteModel = timeFieldModel(minute as Ref<string>, 59, secondInput)
const secondModel = timeFieldModel(second as Ref<string>, 59)

function selectAllOnFocus(e: Event) {
  (e.target as HTMLInputElement).select()
}
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      v-model="hourModel"
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="2"
      class="input-bordered input w-full text-center input-lg"
      @focus="selectAllOnFocus"
    >
    <span class="text-lg font-bold">:</span>
    <input
      ref="minuteInput"
      v-model="minuteModel"
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="2"
      class="input-bordered input w-full text-center input-lg"
      @focus="selectAllOnFocus"
    >
    <span class="text-lg font-bold">:</span>
    <input
      ref="secondInput"
      v-model="secondModel"
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="2"
      class="input-bordered input w-full text-center input-lg"
      @focus="selectAllOnFocus"
    >
  </div>
</template>
