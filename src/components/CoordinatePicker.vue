<script setup lang="ts">
import { COLUMNS, ROWS, SUBS } from '../constants'
import DropdownSelect from './DropdownSelect.vue'

const col = defineModel<string>('col', { required: true })
const row = defineModel<number>('row', { required: true })
const subX = defineModel<number>('subX', { required: true })
const subY = defineModel<number>('subY', { required: true })
</script>

<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <div class="form-control">
      <label class="label"><span class="label-text text-lg">區塊</span></label>
      <DropdownSelect v-model="col" :options="COLUMNS" />
    </div>
    <div class="form-control">
      <label class="label"><span class="label-text text-lg">列</span></label>
      <DropdownSelect v-model="row" :options="ROWS" />
    </div>
    <div class="form-control">
      <label class="label"><span class="label-text text-lg">子座標 X</span></label>
      <DropdownSelect v-model="subX" :options="SUBS" />
    </div>
    <div class="form-control">
      <label class="label"><span class="label-text text-lg">子座標 Y</span></label>
      <DropdownSelect v-model="subY" :options="SUBS" />
    </div>
  </div>
</template>
