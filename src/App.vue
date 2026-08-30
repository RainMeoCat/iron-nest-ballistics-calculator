<script setup lang="ts">
import type { FireRecord } from './types'
import { computed, ref, watch } from 'vue'
import CollapseTransition from './components/CollapseTransition.vue'
import CoordinatePicker from './components/CoordinatePicker.vue'
import GunQueue from './components/GunQueue.vue'
import LabeledPanel from './components/LabeledPanel.vue'
import Modal from './components/Modal.vue'
import ResultCounter from './components/ResultCounter.vue'
import StatTile from './components/StatTile.vue'
import TimeInputGroup from './components/TimeInputGroup.vue'
import { CHARGE_OPTIONS, MAX_RANGE_PER_CHARGE_KM } from './constants'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const gunCol = ref('A')
const gunRow = ref(1)
const gunSubX = ref(0)
const gunSubY = ref(0)
const gunLabel = computed(
  () => `${gunCol.value}${gunRow.value} ${gunSubX.value}:${gunSubY.value}`,
)
const gunModalOpen = ref(true)
const settingsModalOpen = ref(false)

const targetCol = ref('A')
const targetRow = ref(1)
const targetSubX = ref(0)
const targetSubY = ref(0)

const charges = ref(3)

const enableFireTime = ref(true)

const targetHourStr = ref('00')
const targetMinuteStr = ref('00')
const targetSecondStr = ref('00')

function timeToSeconds(h: number, m: number, s: number) {
  return h * 3600 + m * 60 + s
}

function secondsToTime(totalSeconds: number) {
  const normalized = ((totalSeconds % 86400) + 86400) % 86400
  const h = Math.floor(normalized / 3600)
  const m = Math.floor((normalized % 3600) / 60)
  const s = Math.floor(normalized % 60)
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

interface Result {
  distance: number
  azimuth: number
  elevation: number
  flightTime: number
  fireTime: string
}

function toKm(col: string, row: number, subX: number, subY: number) {
  const x = col.charCodeAt(0) - 65 + subX / 10
  const y = row - 1 + subY / 10
  return { x, y }
}

function offsetToTarget() {
  const gunPos = toKm(gunCol.value, gunRow.value, gunSubX.value, gunSubY.value)
  const targetPos = toKm(
    targetCol.value,
    targetRow.value,
    targetSubX.value,
    targetSubY.value,
  )
  return { dx: targetPos.x - gunPos.x, dy: targetPos.y - gunPos.y }
}

const liveDistance = computed(() => {
  const { dx, dy } = offsetToTarget()
  return Math.sqrt(dx ** 2 + dy ** 2)
})

function chargeMaxRange(n: number) {
  return n * MAX_RANGE_PER_CHARGE_KM
}

function isChargeDisabled(n: number) {
  return liveDistance.value > chargeMaxRange(n)
}

watch(
  liveDistance,
  (distance) => {
    if (distance > chargeMaxRange(charges.value)) {
      const nextValid = CHARGE_OPTIONS.find(
        n => distance <= chargeMaxRange(n),
      )
      if (nextValid)
        charges.value = nextValid
    }
  },
  { immediate: true },
)

const result = computed<Result>(() => {
  const { dx, dy } = offsetToTarget()

  const distance = liveDistance.value
  const azimuth
    = distance === 0 ? 0 : (Math.atan2(dx, dy) * (180 / Math.PI) + 360) % 360

  const elevation = (distance * 12) / charges.value
  const flightTime = (distance / (charges.value * 5)) * 38
  const fireTime = secondsToTime(
    timeToSeconds(
      Number(targetHourStr.value || 0),
      Number(targetMinuteStr.value || 0),
      Number(targetSecondStr.value || 0),
    ) - flightTime,
  )

  return { distance, azimuth, elevation, flightTime, fireTime }
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
      <div class="card-body gap-6 p-6 md:p-10">
        <header class="flex items-center gap-4">
          <h1 class="flex-1 text-3xl leading-tight font-bold">
            Iron Nest 彈道計算器
          </h1>
          <button
            type="button"
            aria-label="設定"
            class="btn btn-circle btn-lg btn-ghost"
            @click="settingsModalOpen = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
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
        </header>
        <Modal v-model:open="settingsModalOpen">
          <h3 class="text-lg font-bold text-secondary">
            設定
          </h3>
          <div class="mt-4">
            <label class="label w-fit cursor-pointer gap-2">
              <input
                v-model="enableFireTime"
                type="checkbox"
                class="checkbox checkbox-accent"
              >
              <span class="label-text text-lg">啟用目標落點時間／開火時間</span>
            </label>
          </div>
          <template #actions>
            <form method="dialog">
              <button type="submit" class="btn btn-secondary text-lg">
                完成
              </button>
            </form>
          </template>
        </Modal>
        <button
          type="button"
          class="btn mt-1 gap-2 btn-lg text-xl btn-primary"
          @click="gunModalOpen = true"
        >
          <span class="text-lg">火炮位置（點擊以變更）</span>
          <span class="text-lg">{{ gunLabel }}</span>
        </button>
        <Modal v-model:open="gunModalOpen">
          <h3 class="text-lg font-bold text-secondary">
            設定火炮位置
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
              <button type="submit" class="btn btn-secondary text-lg">
                完成
              </button>
            </form>
          </template>
        </Modal>

        <LabeledPanel label="目標位置" tag="fieldset" overflow-visible>
          <CoordinatePicker
            v-model:col="targetCol"
            v-model:row="targetRow"
            v-model:sub-x="targetSubX"
            v-model:sub-y="targetSubY"
            class="mb-4"
          />
          <CollapseTransition :show="enableFireTime">
            <div class="form-control min-h-0 overflow-hidden">
              <label class="label"><span class="label-text text-lg">目標落點時間（24 小時制）</span></label>
              <TimeInputGroup
                v-model:hour="targetHourStr"
                v-model:minute="targetMinuteStr"
                v-model:second="targetSecondStr"
              />
            </div>
          </CollapseTransition>
        </LabeledPanel>

        <LabeledPanel label="裝藥包數" tag="fieldset">
          <div class="grid w-full grid-cols-6 gap-2">
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

        <LabeledPanel label="計算結果">
          <div class="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            <StatTile label="距離（km）">
              <ResultCounter
                :value="round(result.distance, 2)"
                :places="[10, 1, '.', 0.1, 0.01]"
              />
            </StatTile>

            <StatTile label="方位角">
              <ResultCounter
                :value="round(result.azimuth, 1)"
                :places="[100, 10, 1, '.', 0.1]"
              />
            </StatTile>

            <StatTile label="仰角">
              <ResultCounter
                :value="round(result.elevation, 1)"
                :places="[10, 1, '.', 0.1]"
              />
            </StatTile>
          </div>

          <CollapseTransition :show="enableFireTime">
            <div class="grid min-h-0 grid-cols-2 gap-4 overflow-hidden">
              <StatTile label="飛行時間（秒）">
                <ResultCounter
                  :value="round(result.flightTime, 1)"
                  :places="[10, 1, '.', 0.1]"
                />
              </StatTile>

              <StatTile label="開火時間">
                <div class="flex items-center justify-center gap-1">
                  <ResultCounter :value="fireTimeParts[0]" :places="[10, 1]" />
                  <span class="text-[#5a5d5f] text-[28px] font-bold">:</span>
                  <ResultCounter :value="fireTimeParts[1]" :places="[10, 1]" />
                  <span class="text-[#5a5d5f] text-[28px] font-bold">:</span>
                  <ResultCounter :value="fireTimeParts[2]" :places="[10, 1]" />
                </div>
              </StatTile>
            </div>
          </CollapseTransition>
        </LabeledPanel>

        <div class="flex gap-4">
          <button
            type="button"
            class="btn flex-1 btn-lg text-xl btn-primary"
            :disabled="gun1Queue.length >= 5 || result.distance === 0"
            @click="addToQueue(gun1Queue)"
          >
            載入火炮1（{{ gun1Queue.length }}/5）
          </button>
          <button
            type="button"
            class="btn flex-1 btn-lg text-xl btn-primary"
            :disabled="gun2Queue.length >= 5 || result.distance === 0"
            @click="addToQueue(gun2Queue)"
          >
            載入火炮2（{{ gun2Queue.length }}/5）
          </button>
        </div>
      </div>
    </div>

    <div
      class="plate card w-full max-w-4xl border-1 border-gray-500 lg:w-[48rem]"
    >
      <div class="card-body relative gap-4 p-4">
        <span
          class="engraved-label pointer-events-none absolute bottom-4 left-10 text-4xl font-black whitespace-nowrap italic [font-synthesis:style] select-none md:text-5xl"
        >
          火炮佇列
        </span>
        <div class="grid h-full grid-cols-2 gap-4 pb-16 p-6">
          <GunQueue
            title="火炮1"
            :records="gun1Queue"
            :show-fire-time="enableFireTime"
            @toggle-fired="(id) => toggleFired(gun1Queue, id)"
            @remove="(id) => removeFromQueue(gun1Queue, id)"
          />
          <GunQueue
            title="火炮2"
            :records="gun2Queue"
            :show-fire-time="enableFireTime"
            @toggle-fired="(id) => toggleFired(gun2Queue, id)"
            @remove="(id) => removeFromQueue(gun2Queue, id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
