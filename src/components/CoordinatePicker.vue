<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { COLUMNS, ROWS, SUBS } from '../constants'
import DropdownSelect from './DropdownSelect.vue'

const col = defineModel<string>('col', { required: true })
const row = defineModel<number>('row', { required: true })
const subX = defineModel<number>('subX', { required: true })
const subY = defineModel<number>('subY', { required: true })

const { t } = useI18n()
</script>

<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <div class="form-control">
      <label class="label"><span class="label-text text-base md:text-lg">{{ t('coordinate.block') }}</span></label>
      <DropdownSelect v-model="col" :options="COLUMNS" />
    </div>
    <div class="form-control">
      <label class="label"><span class="label-text text-base md:text-lg">{{ t('coordinate.row') }}</span></label>
      <DropdownSelect v-model="row" :options="ROWS" />
    </div>
    <div class="form-control">
      <label class="label"><span class="label-text text-base md:text-lg">{{ t('coordinate.subX') }}</span></label>
      <DropdownSelect v-model="subX" :options="SUBS" />
    </div>
    <div class="form-control">
      <label class="label"><span class="label-text text-base md:text-lg">{{ t('coordinate.subY') }}</span></label>
      <DropdownSelect v-model="subY" :options="SUBS" />
    </div>
  </div>
</template>
