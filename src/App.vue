<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'
import Counter from './components/Counter.vue'

const COLUMNS = Array.from({ length: 20 }, (_, i) => String.fromCharCode(65 + i)) // A-T
const ROWS = Array.from({ length: 10 }, (_, i) => i + 1) // 1-10
const SUBS = Array.from({ length: 10 }, (_, i) => i) // 0-9
const CHARGE_OPTIONS = Array.from({ length: 6 }, (_, i) => i + 1) // 1-6
const MAX_RANGE_PER_CHARGE_KM = 5 // charge n can reach at most n * 5km

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const gunCol = ref('A')
const gunRow = ref(1)
const gunSubX = ref(0)
const gunSubY = ref(0)
const gunLabel = computed(() => `${gunCol.value}${gunRow.value} ${gunSubX.value}:${gunSubY.value}`)
const gunModal = ref<HTMLDialogElement | null>(null)

onMounted(() => {
  gunModal.value?.showModal()
})

const targetCol = ref('A')
const targetRow = ref(1)
const targetSubX = ref(0)
const targetSubY = ref(0)

const charges = ref(3)

const enableFireTime = ref(true)

const targetHourStr = ref('00')
const targetMinuteStr = ref('00')
const targetSecondStr = ref('00')
const minuteInput = ref<HTMLInputElement | null>(null)
const secondInput = ref<HTMLInputElement | null>(null)

function timeFieldModel(raw: Ref<string>, max: number, next?: Ref<HTMLInputElement | null>) {
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

const hourModel = timeFieldModel(targetHourStr, 23, minuteInput)
const minuteModel = timeFieldModel(targetMinuteStr, 59, secondInput)
const secondModel = timeFieldModel(targetSecondStr, 59)

function selectAllOnFocus(e: Event) {
  (e.target as HTMLInputElement).select()
}

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
  const x = (col.charCodeAt(0) - 65) + subX / 10
  const y = (row - 1) + subY / 10
  return { x, y }
}

function offsetToTarget() {
  const gunPos = toKm(gunCol.value, gunRow.value, gunSubX.value, gunSubY.value)
  const targetPos = toKm(targetCol.value, targetRow.value, targetSubX.value, targetSubY.value)
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

watch(liveDistance, (distance) => {
  if (distance > chargeMaxRange(charges.value)) {
    const nextValid = CHARGE_OPTIONS.find(n => distance <= chargeMaxRange(n))
    if (nextValid)
      charges.value = nextValid
  }
}, { immediate: true })

const result = computed<Result>(() => {
  const { dx, dy } = offsetToTarget()

  const distance = liveDistance.value
  const azimuth = distance === 0 ? 0 : (Math.atan2(dx, dy) * (180 / Math.PI) + 360) % 360

  const elevation = (distance * 12) / charges.value
  const flightTime = (distance / (charges.value * 5)) * 38
  const fireTime = secondsToTime(timeToSeconds(Number(targetHourStr.value || 0), Number(targetMinuteStr.value || 0), Number(targetSecondStr.value || 0)) - flightTime)

  return { distance, azimuth, elevation, flightTime, fireTime }
})

function round(n: number, digits: number) {
  return Number(n.toFixed(digits))
}

const fireTimeParts = computed(() => result.value.fireTime.split(':').map(Number))
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-base-100 to-base-200 flex items-center justify-center p-4 py-10">
    <div class="card w-full max-w-4xl bg-base-100 shadow-2xl border border-base-300">
      <div class="card-body gap-6 p-6 md:p-10">
        <h1 class="text-3xl font-bold leading-tight">
          Iron Nest 彈道計算器
        </h1>
        <button
          type="button" class="btn btn-secondary btn-outline mt-1 gap-2"
          @click="gunModal?.showModal()"
        >
          <span class="text-lg opacity-70">火炮位置（點擊以變更）</span>
          <span class="text-lg">{{ gunLabel }}</span>
        </button>
        <dialog ref="gunModal" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold text-secondary">
              設定火炮位置
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div class="form-control">
                <label class="label"><span class="label-text text-lg">區塊</span></label>
                <select v-model="gunCol" class="select select-bordered select-lg w-full">
                  <option v-for="c in COLUMNS" :key="c" :value="c">
                    {{ c }}
                  </option>
                </select>
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text text-lg">列</span></label>
                <select v-model.number="gunRow" class="select select-bordered select-lg w-full">
                  <option v-for="r in ROWS" :key="r" :value="r">
                    {{ r }}
                  </option>
                </select>
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text text-lg">子座標 X</span></label>
                <select v-model.number="gunSubX" class="select select-bordered select-lg w-full">
                  <option v-for="s in SUBS" :key="s" :value="s">
                    {{ s }}
                  </option>
                </select>
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text text-lg">子座標 Y</span></label>
                <select v-model.number="gunSubY" class="select select-bordered select-lg w-full">
                  <option v-for="s in SUBS" :key="s" :value="s">
                    {{ s }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <button type="submit" class="btn btn-secondary">
                  完成
                </button>
              </form>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button type="submit">
              close
            </button>
          </form>
        </dialog>

        <fieldset class="fieldset relative overflow-hidden rounded-box border-2 border-accent/40 bg-accent/5 p-6 pb-14">
          <span class="pointer-events-none absolute bottom-1 left-4 select-none whitespace-nowrap text-4xl font-black text-accent/15 md:text-5xl">
            目標位置
          </span>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="form-control">
              <label class="label"><span class="label-text text-lg">區塊</span></label>
              <select v-model="targetCol" class="select select-bordered select-lg w-full">
                <option v-for="c in COLUMNS" :key="c" :value="c">
                  {{ c }}
                </option>
              </select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text text-lg">列</span></label>
              <select v-model.number="targetRow" class="select select-bordered select-lg w-full">
                <option v-for="r in ROWS" :key="r" :value="r">
                  {{ r }}
                </option>
              </select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text text-lg">子座標 X</span></label>
              <select v-model.number="targetSubX" class="select select-bordered select-lg w-full">
                <option v-for="s in SUBS" :key="s" :value="s">
                  {{ s }}
                </option>
              </select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text text-lg">子座標 Y</span></label>
              <select v-model.number="targetSubY" class="select select-bordered select-lg w-full">
                <option v-for="s in SUBS" :key="s" :value="s">
                  {{ s }}
                </option>
              </select>
            </div>
          </div>
          <label class="label mt-4 w-fit cursor-pointer gap-2">
            <input v-model="enableFireTime" type="checkbox" class="checkbox checkbox-accent">
            <span class="label-text text-lg">啟用目標落點時間／開火時間</span>
          </label>
          <Transition name="collapse">
            <div v-if="enableFireTime" class="collapse-row">
              <div class="form-control min-h-0 overflow-hidden">
                <label class="label"><span class="label-text text-lg">目標落點時間（24 小時制）</span></label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="hourModel" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
                    class="input input-bordered input-lg w-full text-center"
                    @focus="selectAllOnFocus"
                  >
                  <span class="text-lg font-bold">:</span>
                  <input
                    ref="minuteInput"
                    v-model="minuteModel" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
                    class="input input-bordered input-lg w-full text-center"
                    @focus="selectAllOnFocus"
                  >
                  <span class="text-lg font-bold">:</span>
                  <input
                    ref="secondInput"
                    v-model="secondModel" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
                    class="input input-bordered input-lg w-full text-center"
                    @focus="selectAllOnFocus"
                  >
                </div>
              </div>
            </div>
          </Transition>
        </fieldset>

        <fieldset class="fieldset relative overflow-hidden rounded-box border-2 border-primary/40 bg-primary/5 p-6 pb-14">
          <span class="pointer-events-none absolute bottom-1 left-4 select-none whitespace-nowrap text-4xl font-black text-primary/15 md:text-5xl">
            裝藥包數
          </span>
          <div class="grid grid-cols-6 gap-2 w-full">
            <input
              v-for="n in CHARGE_OPTIONS" :key="n"
              v-model.number="charges" type="radio" name="charges"
              :aria-label="String(n)" :value="n" :disabled="isChargeDisabled(n)"
              class="btn btn-lg"
            >
          </div>
        </fieldset>

        <div class="relative overflow-hidden rounded-box border-2 border-info/40 bg-info/5 p-6 pb-14">
          <span class="pointer-events-none absolute bottom-1 left-4 select-none whitespace-nowrap text-4xl font-black text-info/15 md:text-5xl">
            計算結果
          </span>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div class="stat relative overflow-hidden place-items-center rounded-box bg-base-200 p-8">
              <div class="stat-value">
                <Counter :value="round(result.distance, 2)" :places="[10, 1, '.', 0.1, 0.01]" :font-size="28" :font-weight="700" :gap="1" :horizontal-padding="0" :border-radius="0" :gradient-height="0" />
              </div>
              <span class="pointer-events-none absolute bottom-0  left-2 select-none whitespace-nowrap text-2xl font-black text-base-content/30">
                距離（km）
              </span>
            </div>

            <div class="stat relative overflow-hidden place-items-center rounded-box bg-base-200 p-8">
              <div class="stat-value">
                <Counter :value="round(result.azimuth, 1)" :places="[100, 10, 1, '.', 0.1]" :font-size="28" :font-weight="700" :gap="1" :horizontal-padding="0" :border-radius="0" :gradient-height="0" />
              </div>
              <span class="pointer-events-none absolute bottom-0  left-2 select-none whitespace-nowrap text-2xl font-black text-base-content/30">
                方位角
              </span>
            </div>

            <div class="stat relative overflow-hidden place-items-center rounded-box bg-base-200 p-8">
              <div class="stat-value">
                <Counter :value="round(result.elevation, 1)" :places="[10, 1, '.', 0.1]" :font-size="28" :font-weight="700" :gap="1" :horizontal-padding="0" :border-radius="0" :gradient-height="0" />
              </div>
              <span class="pointer-events-none absolute bottom-0  left-2 select-none whitespace-nowrap text-2xl font-black text-base-content/30">
                仰角
              </span>
            </div>
          </div>

          <Transition name="collapse">
            <div v-if="enableFireTime" class="collapse-row">
              <div class="grid grid-cols-2 gap-4 min-h-0 overflow-hidden">
                <div class="stat relative overflow-hidden place-items-center rounded-box bg-base-200 p-8">
                  <div class="stat-value">
                    <Counter :value="round(result.flightTime, 1)" :places="[10, 1, '.', 0.1]" :font-size="28" :font-weight="700" :gap="1" :horizontal-padding="0" :border-radius="0" :gradient-height="0" />
                  </div>
                  <span class="pointer-events-none absolute bottom-0  left-2 select-none whitespace-nowrap text-2xl font-black text-base-content/30">
                    飛行時間（秒）
                  </span>
                </div>

                <div class="stat relative overflow-hidden place-items-center rounded-box bg-base-200 p-8">
                  <div class="stat-value flex items-center justify-center gap-1">
                    <Counter :value="fireTimeParts[0]" :places="[10, 1]" :font-size="28" :font-weight="700" :gap="1" :horizontal-padding="0" :border-radius="0" :gradient-height="0" />
                    <span class="text-[28px] font-bold">:</span>
                    <Counter :value="fireTimeParts[1]" :places="[10, 1]" :font-size="28" :font-weight="700" :gap="1" :horizontal-padding="0" :border-radius="0" :gradient-height="0" />
                    <span class="text-[28px] font-bold">:</span>
                    <Counter :value="fireTimeParts[2]" :places="[10, 1]" :font-size="28" :font-weight="700" :gap="1" :horizontal-padding="0" :border-radius="0" :gradient-height="0" />
                  </div>
                  <span class="pointer-events-none absolute bottom-0  left-2 select-none whitespace-nowrap text-2xl font-black text-base-content/30">
                    開火時間
                  </span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collapse-row {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: grid-template-rows 1s ease, opacity 1s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}
</style>
