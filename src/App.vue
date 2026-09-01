<script setup lang="ts">
import type { FireSolution, GridCoordinate } from './lib/ballistics'
import type { FireRecord } from './types'
import { ListOrdered } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CollapseTransition from './components/CollapseTransition.vue'
import CoordinatePicker from './components/CoordinatePicker.vue'
import DropdownSelect from './components/DropdownSelect.vue'
import GunQueue from './components/GunQueue.vue'
import LabeledPanel from './components/LabeledPanel.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import Modal from './components/Modal.vue'
import ResultCounter from './components/ResultCounter.vue'
import StatTile from './components/StatTile.vue'
import TimeInputGroup from './components/TimeInputGroup.vue'
import { CHARGE_OPTIONS } from './constants'
import { distanceKm, isWithinRange, offsetKm, solveFireSolution } from './lib/ballistics'
import { fireTimeFor, pad, timeToSeconds } from './lib/time'

const { t } = useI18n()

const gunCol = ref('A')
const gunRow = ref(1)
const gunSubX = ref(0)
const gunSubY = ref(0)
const gunCoord = computed<GridCoordinate>(() => ({
  col: gunCol.value,
  row: gunRow.value,
  subX: gunSubX.value,
  subY: gunSubY.value,
}))
const gunLabel = computed(
  () => `${gunCol.value}${gunRow.value} ${gunSubX.value}:${gunSubY.value}`,
)
const gunModalOpen = ref(true)
const settingsModalOpen = ref(false)
const queueModalOpen = ref(false)
const activeQueueGun = ref<1 | 2>(1)

const targetCol = ref('A')
const targetRow = ref(1)
const targetSubX = ref(0)
const targetSubY = ref(0)
const targetCoord = computed<GridCoordinate>(() => ({
  col: targetCol.value,
  row: targetRow.value,
  subX: targetSubX.value,
  subY: targetSubY.value,
}))

const charges = ref(3)

const enableFireTime = ref(true)

const targetHourStr = ref('00')
const targetMinuteStr = ref('00')
const targetSecondStr = ref('00')

interface Result extends FireSolution {
  fireTime: string
}

const offset = computed(() => offsetKm(gunCoord.value, targetCoord.value))

const liveDistance = computed(() => distanceKm(offset.value))

function isChargeDisabled(n: number) {
  return !isWithinRange(liveDistance.value, n)
}

watch(
  liveDistance,
  (distance) => {
    if (!isWithinRange(distance, charges.value)) {
      const nextValid = CHARGE_OPTIONS.find(n => isWithinRange(distance, n))
      if (nextValid)
        charges.value = nextValid
    }
  },
  { immediate: true },
)

const impactSeconds = computed(() =>
  timeToSeconds(
    Number(targetHourStr.value || 0),
    Number(targetMinuteStr.value || 0),
    Number(targetSecondStr.value || 0),
  ),
)

const result = computed<Result>(() => {
  const solution = solveFireSolution(offset.value, charges.value)
  return {
    ...solution,
    fireTime: fireTimeFor(impactSeconds.value, solution.flightTime),
  }
})

function round(n: number, digits: number) {
  return Number(n.toFixed(digits))
}

const fireTimeParts = computed(() =>
  result.value.fireTime.split(':').map(Number),
)

const targetLabel = computed(
  () => `${targetCol.value}${targetRow.value} ${targetSubX.value}:${targetSubY.value}`,
)

const targetImpactTime = computed(
  () => `${pad(Number(targetHourStr.value || 0))}:${pad(Number(targetMinuteStr.value || 0))}:${pad(Number(targetSecondStr.value || 0))}`,
)

let nextRecordId = 0
const gun1Queue = ref<FireRecord[]>([])
const gun2Queue = ref<FireRecord[]>([])

function addToQueue(queue: FireRecord[]) {
  if (queue.length >= 5 || result.value.distance === 0)
    return
  queue.push({
    id: nextRecordId++,
    targetLabel: targetLabel.value,
    charges: charges.value,
    azimuth: round(result.value.azimuth, 1),
    elevation: round(result.value.elevation, 1),
    impactTime: enableFireTime.value ? targetImpactTime.value : null,
    fireTime: enableFireTime.value ? result.value.fireTime : null,
    fired: false,
  })
}

function toggleFired(queue: FireRecord[], id: number) {
  const record = queue.find(r => r.id === id)
  if (record)
    record.fired = !record.fired
}

function removeFromQueue(queue: FireRecord[], id: number) {
  const index = queue.findIndex(r => r.id === id)
  if (index !== -1)
    queue.splice(index, 1)
}
</script>

<template>
  <div
    class="app-shell flex min-h-screen flex-col items-center justify-center gap-6 p-4 py-10 lg:flex-row lg:items-stretch"
  >
    <div
      class="plate card w-full max-w-4xl border-1 border-gray-500"
    >
      <div class="card-body gap-6 p-6 ">
        <header class="flex flex-col gap-4 md:flex-row md:items-center">
          <h1 class="text-2xl leading-tight font-bold md:flex-1 md:text-3xl">
            {{ t('app.title') }}
          </h1>
          <div class="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              type="button"
              :aria-label="t('settings.ariaLabel')"
              class="btn btn-circle btn-lg btn-metal"
              @click="settingsModalOpen = true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 md:h-6 md:w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </header>
        <Modal v-model:open="settingsModalOpen">
          <h3 class="text-base md:text-lg font-bold text-secondary">
            {{ t('settings.title') }}
          </h3>
          <div class="mt-4">
            <label class="label w-fit cursor-pointer gap-2">
              <input
                v-model="enableFireTime"
                type="checkbox"
                class="checkbox checkbox-accent"
              >
              <span class="label-text text-base md:text-lg">{{ t('settings.enableFireTime') }}</span>
            </label>
          </div>
          <template #actions>
            <form method="dialog">
              <button type="submit" class="btn btn-secondary text-base md:text-lg">
                {{ t('settings.done') }}
              </button>
            </form>
          </template>
        </Modal>
        <button
          type="button"
          class="btn mt-1 px-0 gap-2 btn-lg text-xl btn-primary"
          @click="gunModalOpen = true"
        >
          <span class="text-base md:text-lg">{{ t('gun.positionButton') }}</span>
          <span class="text-base md:text-lg">{{ gunLabel }}</span>
        </button>
        <Modal v-model:open="gunModalOpen">
          <h3 class="text-base md:text-lg font-bold text-secondary">
            {{ t('gun.positionTitle') }}
          </h3>
          <div class="mt-4">
            <CoordinatePicker
              v-model:col="gunCol"
              v-model:row="gunRow"
              v-model:sub-x="gunSubX"
              v-model:sub-y="gunSubY"
            />
          </div>
          <template #actions>
            <form method="dialog">
              <button type="submit" class="btn btn-secondary text-base md:text-lg">
                {{ t('gun.done') }}
              </button>
            </form>
          </template>
        </Modal>

        <LabeledPanel :label="t('target.panelLabel')" tag="fieldset" overflow-visible>
          <CoordinatePicker
            v-model:col="targetCol"
            v-model:row="targetRow"
            v-model:sub-x="targetSubX"
            v-model:sub-y="targetSubY"
            class="mb-4"
          />
          <CollapseTransition :show="enableFireTime">
            <div class="form-control min-h-0 overflow-hidden">
              <label class="label"><span class="label-text text-base md:text-lg">{{ t('target.impactTimeLabel') }}</span></label>
              <TimeInputGroup
                v-model:hour="targetHourStr"
                v-model:minute="targetMinuteStr"
                v-model:second="targetSecondStr"
              />
            </div>
          </CollapseTransition>
        </LabeledPanel>

        <LabeledPanel :label="t('charges.panelLabel')" tag="fieldset" overflow-visible>
          <div class="md:hidden">
            <DropdownSelect
              v-model="charges"
              :options="CHARGE_OPTIONS"
              :option-disabled="(n) => isChargeDisabled(Number(n))"
            />
          </div>
          <div class="hidden w-full grid-cols-6 gap-2 md:grid">
            <input
              v-for="n in CHARGE_OPTIONS"
              :key="n"
              v-model.number="charges"
              type="radio"
              name="charges"
              :aria-label="String(n)"
              :value="n"
              :disabled="isChargeDisabled(n)"
              class="btn btn-lg"
            >
          </div>
        </LabeledPanel>

        <LabeledPanel :label="t('result.panelLabel')">
          <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatTile :label="t('result.distance')">
              <ResultCounter
                :value="round(result.distance, 2)"
                :places="[10, 1, '.', 0.1, 0.01]"
              />
            </StatTile>

            <StatTile :label="t('result.azimuth')">
              <ResultCounter
                :value="round(result.azimuth, 1)"
                :places="[100, 10, 1, '.', 0.1]"
              />
            </StatTile>

            <StatTile :label="t('result.elevation')">
              <ResultCounter
                :value="round(result.elevation, 1)"
                :places="[10, 1, '.', 0.1]"
              />
            </StatTile>
          </div>

          <CollapseTransition :show="enableFireTime">
            <div class="grid min-h-0 grid-cols-1 gap-4 overflow-hidden md:grid-cols-2">
              <StatTile :label="t('result.flightTime')">
                <ResultCounter
                  :value="round(result.flightTime, 1)"
                  :places="[10, 1, '.', 0.1]"
                />
              </StatTile>

              <StatTile :label="t('result.fireTime')">
                <div class="flex items-center justify-center gap-1">
                  <ResultCounter :value="fireTimeParts[0]" :places="[10, 1]" />
                  <span class="text-[#5a5d5f] text-[20px] font-bold md:text-[28px]">:</span>
                  <ResultCounter :value="fireTimeParts[1]" :places="[10, 1]" />
                  <span class="text-[#5a5d5f] text-[20px] font-bold md:text-[28px]">:</span>
                  <ResultCounter :value="fireTimeParts[2]" :places="[10, 1]" />
                </div>
              </StatTile>
            </div>
          </CollapseTransition>
        </LabeledPanel>

        <div class="flex flex-col gap-4 md:flex-row">
          <button
            type="button"
            class="btn flex-1 btn-lg text-xl btn-primary"
            :disabled="gun1Queue.length >= 5 || result.distance === 0"
            @click="addToQueue(gun1Queue)"
          >
            {{ t('queue.load', { n: 1, count: gun1Queue.length }) }}
          </button>
          <button
            type="button"
            class="btn flex-1 btn-lg text-xl btn-primary"
            :disabled="gun2Queue.length >= 5 || result.distance === 0"
            @click="addToQueue(gun2Queue)"
          >
            {{ t('queue.load', { n: 2, count: gun2Queue.length }) }}
          </button>
        </div>
      </div>
    </div>

    <div
      class="plate card hidden w-full max-w-4xl border-1 border-gray-500 md:block lg:w-[72rem]"
    >
      <div class="card-body relative">
        <span
          class="engraved-label  pointer-events-none absolute bottom-4 left-10 text-4xl font-black whitespace-nowrap italic [font-synthesis:style] select-none md:text-5xl"
        >
          {{ t('queue.title') }}
        </span>
        <div class="grid h-full grid-cols-2 gap-2 md:gap-4 md:pb-18 p-6">
          <GunQueue
            :title="t('queue.gunLabel', { n: 1 })"
            :records="gun1Queue"
            :show-fire-time="enableFireTime"
            @toggle-fired="(id) => toggleFired(gun1Queue, id)"
            @remove="(id) => removeFromQueue(gun1Queue, id)"
          />
          <GunQueue
            :title="t('queue.gunLabel', { n: 2 })"
            :records="gun2Queue"
            :show-fire-time="enableFireTime"
            @toggle-fired="(id) => toggleFired(gun2Queue, id)"
            @remove="(id) => removeFromQueue(gun2Queue, id)"
          />
        </div>
      </div>
    </div>

    <button
      type="button"
      :aria-label="t('queue.title')"
      class="btn btn-circle btn-lg btn-primary fixed right-4 bottom-4 z-10 h-14! w-14! shadow-lg md:hidden"
      @click="queueModalOpen = true"
    >
      <ListOrdered class="h-8 w-8" />
    </button>
    <Modal v-model:open="queueModalOpen">
      <h3 class="text-xl font-bold text-secondary md:text-lg">
        {{ t('queue.title') }}
      </h3>
      <div class="mt-4 grid grid-cols-2 gap-2">
        <input
          v-model.number="activeQueueGun"
          type="radio"
          name="activeQueueGun"
          :aria-label="t('queue.gunLabel', { n: 1 })"
          :value="1"
          class="btn btn-lg"
        >
        <input
          v-model.number="activeQueueGun"
          type="radio"
          name="activeQueueGun"
          :aria-label="t('queue.gunLabel', { n: 2 })"
          :value="2"
          class="btn btn-lg"
        >
      </div>
      <div class="mt-4">
        <GunQueue
          v-if="activeQueueGun === 1"
          :title="t('queue.gunLabel', { n: 1 })"
          :records="gun1Queue"
          :show-fire-time="enableFireTime"
          @toggle-fired="(id) => toggleFired(gun1Queue, id)"
          @remove="(id) => removeFromQueue(gun1Queue, id)"
        />
        <GunQueue
          v-else
          :title="t('queue.gunLabel', { n: 2 })"
          :records="gun2Queue"
          :show-fire-time="enableFireTime"
          @toggle-fired="(id) => toggleFired(gun2Queue, id)"
          @remove="(id) => removeFromQueue(gun2Queue, id)"
        />
      </div>
    </Modal>
  </div>
</template>
