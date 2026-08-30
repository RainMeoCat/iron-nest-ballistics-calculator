<script setup lang="ts">
import type { FireRecord } from '../types'
import { Check, Trash2 } from 'lucide-vue-next'
import Counter from './Counter.vue'

defineProps<{
  title: string
  records: FireRecord[]
  showFireTime: boolean
}>()

const emit = defineEmits<{
  toggleFired: [id: number]
  remove: [id: number]
}>()

function pinPosition(el: Element) {
  const target = el as HTMLElement
  target.style.top = `${target.offsetTop}px`
  target.style.left = `${target.offsetLeft}px`
}
</script>

<template>
  <div
    class="relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border-2 border-[#5a5d5f] p-4 pb-10"
  >
    <div class="flex flex-col gap-3">
      <TransitionGroup
        name="record"
        tag="div"
        class="relative flex flex-col gap-3"
        @before-leave="pinPosition"
      >
        <div
          v-for="record in records"
          :key="record.id"
          class="plate relative overflow-hidden border border-gray-500 bg-base-200 p-4 text-lg"
        >
          <Transition name="draw">
            <svg
              v-if="record.fired"
              class="pointer-events-none absolute inset-0 h-full w-full stroke-gray-500"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                stroke-width="1"
                pathLength="100"
                stroke-dasharray="100"
                stroke-dashoffset="0"
              />
            </svg>
          </Transition>
          <div
            class="transition-opacity duration-500"
            :class="{ 'opacity-30': record.fired }"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="truncate font-bold">
                {{ record.targetLabel }}
              </span>
              <div class="flex shrink-0 gap-1">
                <button
                  type="button"
                  class="btn btn-circle btn-ghost btn-sm"
                  :class="{ 'text-success': record.fired }"
                  :aria-label="record.fired ? '取消已開火' : '標記已開火'"
                  @click="emit('toggleFired', record.id)"
                >
                  <Check class="h-5 w-5" />
                </button>
                <button
                  type="button"
                  class="btn btn-circle btn-ghost text-error btn-sm"
                  aria-label="刪除紀錄"
                  @click="emit('remove', record.id)"
                >
                  <Trash2 class="h-5 w-5" />
                </button>
              </div>
            </div>
            <div class="mt-2 flex flex-wrap gap-x-3 text-lg opacity-70">
              <span>裝藥 {{ record.charges }}</span>
              <span>方位 {{ record.azimuth }}°</span>
              <span>仰角 {{ record.elevation }}</span>
            </div>
            <Transition name="collapse">
              <div
                v-if="showFireTime && (record.impactTime || record.fireTime)"
                class="collapse-row"
              >
                <div
                  class="grid min-h-0 grid-cols-2 gap-x-3 overflow-hidden text-lg opacity-70"
                >
                  <span v-if="record.fireTime">開火 {{ record.fireTime }}</span>
                  <span v-if="record.impactTime">落地 {{ record.impactTime }}</span>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <span
      class="pointer-events-none absolute bottom-0 left-1 text-5xl font-black whitespace-nowrap text-[#5a5d5f] italic [font-synthesis:style] select-none"
    >
      {{ title }}
    </span>
    <span
      class="pointer-events-none absolute right-1 bottom-0 flex items-end whitespace-nowrap text-[#5a5d5f] italic [font-synthesis:style] select-none"
    >
      <Counter
        :value="records.length"
        :font-size="48"
        :font-weight="900"
        :gap="0"
        :horizontal-padding="0"
        :border-radius="0"
        :gradient-height="0"
        :digit-style="{ width: '1.3ch' }"
      />
      <span class="text-5xl font-black">/5</span>
    </span>
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

.draw-enter-active,
.draw-leave-active {
  transition: opacity 0.6s ease;
}

.draw-enter-active line,
.draw-leave-active line {
  transition: stroke-dashoffset 0.6s ease;
}

.draw-enter-from,
.draw-leave-to {
  opacity: 0;
}

.draw-enter-from line,
.draw-leave-to line {
  stroke-dashoffset: 100;
}

.record-move,
.record-enter-active,
.record-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.record-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.record-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.record-leave-active {
  position: absolute;
  width: 100%;
}
</style>
