<script setup lang="ts">
import type { Ref } from 'vue'
import type { FireRecord } from './types'
import { Palette } from 'lucide-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import Counter from './components/Counter.vue'
import DropdownSelect from './components/DropdownSelect.vue'
import GunQueue from './components/GunQueue.vue'

const COLUMNS = Array.from({ length: 20 }, (_, i) =>
  String.fromCharCode(65 + i)) // A-T
const ROWS = Array.from({ length: 10 }, (_, i) => i + 1) // 1-10
const SUBS = Array.from({ length: 10 }, (_, i) => i) // 0-9
const CHARGE_OPTIONS = Array.from({ length: 6 }, (_, i) => i + 1) // 1-6
const MAX_RANGE_PER_CHARGE_KM = 5 // charge n can reach at most n * 5km

const THEMES = [
  'ironnest',
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
  'abyss',
  'silk',
  'caramellatte',
]
const currentTheme = ref('ironnest')

function setTheme(theme: string) {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

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
const gunModal = ref<HTMLDialogElement | null>(null)

onMounted(() => {
  gunModal.value?.showModal()

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && THEMES.includes(savedTheme)) {
    currentTheme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
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

const hourModel = timeFieldModel(targetHourStr, 23, minuteInput)
const minuteModel = timeFieldModel(targetMinuteStr, 59, secondInput)
const secondModel = timeFieldModel(targetSecondStr, 59)

function selectAllOnFocus(e: Event) {
  ;(e.target as HTMLInputElement).select()
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
    class="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-base-100 to-base-200 p-4 py-10 lg:flex-row lg:items-stretch"
  >
    <div
      class="card w-full max-w-4xl border border-base-300 bg-base-100 shadow-2xl"
    >
      <div class="card-body gap-6 p-6 md:p-10">
        <header class="flex items-center gap-4">
          <h1 class="flex-1 text-3xl leading-tight font-bold">
            Iron Nest 彈道計算器
          </h1>
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn btn-circle btn-ghost btn-lg"
              aria-label="選擇主題"
            >
              <Palette class="h-6 w-6" />
            </div>
            <ul
              tabindex="0"
              class="menu dropdown-content z-10 mt-2 max-h-96 w-56 flex-nowrap overflow-y-auto rounded-box bg-base-200 p-2 shadow-2xl"
            >
              <li v-for="theme in THEMES" :key="theme">
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-3"
                  :class="{ active: theme === currentTheme }"
                  @click="setTheme(theme)"
                >
                  <span class="text-sm">{{ theme }}</span>
                  <span
                    :data-theme="theme"
                    class="flex shrink-0 gap-1 rounded-field bg-base-100 p-1"
                  >
                    <span class="h-3 w-3 rounded-full bg-primary" />
                    <span class="h-3 w-3 rounded-full bg-secondary" />
                    <span class="h-3 w-3 rounded-full bg-accent" />
                    <span class="h-3 w-3 rounded-full bg-neutral" />
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </header>
        <button
          type="button"
          class="btn mt-1 gap-2 btn-outline btn-secondary"
          @click="gunModal?.showModal()"
        >
          <span class="text-lg opacity-70">火炮位置（點擊以變更）</span>
          <span class="text-lg">{{ gunLabel }}</span>
        </button>
        <dialog ref="gunModal" class="modal">
          <div class="modal-box !overflow-visible">
            <h3 class="text-lg font-bold text-secondary">
              設定火炮位置
            </h3>
            <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div class="form-control">
                <label class="label"><span class="label-text text-lg">區塊</span></label>
                <DropdownSelect v-model="gunCol" :options="COLUMNS" />
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text text-lg">列</span></label>
                <DropdownSelect v-model="gunRow" :options="ROWS" />
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text text-lg">子座標 X</span></label>
                <DropdownSelect v-model="gunSubX" :options="SUBS" />
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text text-lg">子座標 Y</span></label>
                <DropdownSelect v-model="gunSubY" :options="SUBS" />
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

        <fieldset
          class="relative fieldset rounded-box border-2 border-accent/40 bg-accent/5 p-6 pb-14"
        >
          <div
            class="pointer-events-none absolute inset-0 overflow-hidden rounded-box"
          >
            <span
              class="absolute bottom-1 left-1 text-4xl font-black whitespace-nowrap text-accent/40 italic [font-synthesis:style] select-none md:text-5xl"
            >
              目標位置
            </span>
          </div>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="form-control">
              <label class="label"><span class="label-text text-lg">區塊</span></label>
              <DropdownSelect v-model="targetCol" :options="COLUMNS" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text text-lg">列</span></label>
              <DropdownSelect v-model="targetRow" :options="ROWS" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text text-lg">子座標 X</span></label>
              <DropdownSelect v-model="targetSubX" :options="SUBS" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text text-lg">子座標 Y</span></label>
              <DropdownSelect v-model="targetSubY" :options="SUBS" />
            </div>
          </div>
          <label class="label mt-4 w-fit cursor-pointer gap-2">
            <input
              v-model="enableFireTime"
              type="checkbox"
              class="checkbox checkbox-accent"
            >
            <span class="label-text text-lg">啟用目標落點時間／開火時間</span>
          </label>
          <Transition name="collapse">
            <div v-if="enableFireTime" class="collapse-row">
              <div class="form-control min-h-0 overflow-hidden">
                <label class="label"><span class="label-text text-lg">目標落點時間（24 小時制）</span></label>
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
              </div>
            </div>
          </Transition>
        </fieldset>

        <fieldset
          class="relative fieldset overflow-hidden rounded-box border-2 border-primary/40 bg-primary/5 p-6 pb-14"
        >
          <span
            class="pointer-events-none absolute bottom-1 left-1 text-4xl font-black whitespace-nowrap text-primary/40 italic [font-synthesis:style] select-none md:text-5xl"
          >
            裝藥包數
          </span>
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
        </fieldset>

        <div
          class="relative overflow-hidden rounded-box border-2 border-info/40 bg-info/5 p-6 pb-14"
        >
          <span
            class="pointer-events-none absolute bottom-1 left-1 text-4xl font-black whitespace-nowrap text-info/40 italic [font-synthesis:style] select-none md:text-5xl"
          >
            計算結果
          </span>

          <div class="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            <div
              class="relative flex items-center justify-center overflow-hidden rounded-box bg-base-200 p-8"
            >
              <Counter
                :value="round(result.distance, 2)"
                :places="[10, 1, '.', 0.1, 0.01]"
                :font-size="28"
                :font-weight="700"
                :gap="1"
                :horizontal-padding="0"
                :border-radius="0"
                :gradient-height="0"
              />
              <span
                class="pointer-events-none absolute bottom-0 left-2 text-2xl font-black whitespace-nowrap text-base-content/30 italic [font-synthesis:style] select-none"
              >
                距離（km）
              </span>
            </div>

            <div
              class="relative flex items-center justify-center overflow-hidden rounded-box bg-base-200 p-8"
            >
              <Counter
                :value="round(result.azimuth, 1)"
                :places="[100, 10, 1, '.', 0.1]"
                :font-size="28"
                :font-weight="700"
                :gap="1"
                :horizontal-padding="0"
                :border-radius="0"
                :gradient-height="0"
              />
              <span
                class="pointer-events-none absolute bottom-0 left-2 text-2xl font-black whitespace-nowrap text-base-content/30 italic [font-synthesis:style] select-none"
              >
                方位角
              </span>
            </div>

            <div
              class="relative flex items-center justify-center overflow-hidden rounded-box bg-base-200 p-8"
            >
              <Counter
                :value="round(result.elevation, 1)"
                :places="[10, 1, '.', 0.1]"
                :font-size="28"
                :font-weight="700"
                :gap="1"
                :horizontal-padding="0"
                :border-radius="0"
                :gradient-height="0"
              />
              <span
                class="pointer-events-none absolute bottom-0 left-2 text-2xl font-black whitespace-nowrap text-base-content/30 italic [font-synthesis:style] select-none"
              >
                仰角
              </span>
            </div>
          </div>

          <Transition name="collapse">
            <div v-if="enableFireTime" class="collapse-row">
              <div class="grid min-h-0 grid-cols-2 gap-4 overflow-hidden">
                <div
                  class="relative flex items-center justify-center overflow-hidden rounded-box bg-base-200 p-8"
                >
                  <Counter
                    :value="round(result.flightTime, 1)"
                    :places="[10, 1, '.', 0.1]"
                    :font-size="28"
                    :font-weight="700"
                    :gap="1"
                    :horizontal-padding="0"
                    :border-radius="0"
                    :gradient-height="0"
                  />
                  <span
                    class="pointer-events-none absolute bottom-0 left-2 text-2xl font-black whitespace-nowrap text-base-content/30 italic [font-synthesis:style] select-none"
                  >
                    飛行時間（秒）
                  </span>
                </div>

                <div
                  class="relative flex items-center justify-center overflow-hidden rounded-box bg-base-200 p-8"
                >
                  <div class="flex items-center justify-center gap-1">
                    <Counter
                      :value="fireTimeParts[0]"
                      :places="[10, 1]"
                      :font-size="28"
                      :font-weight="700"
                      :gap="1"
                      :horizontal-padding="0"
                      :border-radius="0"
                      :gradient-height="0"
                    />
                    <span class="text-[28px] font-bold">:</span>
                    <Counter
                      :value="fireTimeParts[1]"
                      :places="[10, 1]"
                      :font-size="28"
                      :font-weight="700"
                      :gap="1"
                      :horizontal-padding="0"
                      :border-radius="0"
                      :gradient-height="0"
                    />
                    <span class="text-[28px] font-bold">:</span>
                    <Counter
                      :value="fireTimeParts[2]"
                      :places="[10, 1]"
                      :font-size="28"
                      :font-weight="700"
                      :gap="1"
                      :horizontal-padding="0"
                      :border-radius="0"
                      :gradient-height="0"
                    />
                  </div>
                  <span
                    class="pointer-events-none absolute bottom-0 left-2 text-2xl font-black whitespace-nowrap text-base-content/30 italic [font-synthesis:style] select-none"
                  >
                    開火時間
                  </span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

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
            class="btn flex-1 btn-lg text-xl btn-secondary"
            :disabled="gun2Queue.length >= 5 || result.distance === 0"
            @click="addToQueue(gun2Queue)"
          >
            載入火炮2（{{ gun2Queue.length }}/5）
          </button>
        </div>
      </div>
    </div>

    <div
      class="card w-full max-w-4xl border border-base-300 bg-base-100 shadow-2xl lg:w-[48rem]"
    >
      <div class="card-body gap-4 p-4">
        <div
          class="relative flex-1 overflow-hidden rounded-box border-2 border-warning/40 bg-warning/5 p-4 pb-14"
        >
          <span
            class="pointer-events-none absolute bottom-1 left-1 text-4xl font-black whitespace-nowrap text-warning/40 italic [font-synthesis:style] select-none md:text-5xl"
          >
            火炮佇列
          </span>
          <div class="grid h-full grid-cols-2 gap-4">
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
  transition:
    grid-template-rows 1s ease,
    opacity 1s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}
</style>
