<script setup lang="ts">
import type { FireRecord } from '../types'
import { useMediaQuery } from '@vueuse/core'
import { Check, Trash2 } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { MOBILE_MEDIA_QUERY } from '../constants'
import CollapseTransition from './CollapseTransition.vue'
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

const { t } = useI18n()
const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)

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
          class="plate relative overflow-hidden border border-gray-500 bg-base-200 p-4 text-base md:text-lg"
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
                  :aria-label="record.fired ? t('queue.unmarkFired') : t('queue.markFired')"
                  @click="emit('toggleFired', record.id)"
                >
                  <Check class="h-5 w-5" />
                </button>
                <button
                  type="button"
                  class="btn btn-circle btn-ghost text-error btn-sm"
                  :aria-label="t('queue.deleteRecord')"
                  @click="emit('remove', record.id)"
                >
                  <Trash2 class="h-5 w-5" />
                </button>
              </div>
            </div>
            <div class="mt-2 flex flex-wrap gap-x-3 text-base md:text-lg opacity-70">
              <span>{{ t('queue.chargeValue', { n: record.charges }) }}</span>
              <span>{{ t('queue.azimuthValue', { n: record.azimuth }) }}</span>
              <span>{{ t('queue.elevationValue', { n: record.elevation }) }}</span>
            </div>
            <CollapseTransition :show="showFireTime && !!(record.impactTime || record.fireTime)">
              <div
                class="grid min-h-0 grid-cols-2 gap-x-3 overflow-hidden text-base md:text-lg opacity-70"
              >
                <span v-if="record.fireTime">{{ t('queue.fireTimeValue', { n: record.fireTime }) }}</span>
                <span v-if="record.impactTime">{{ t('queue.impactTimeValue', { n: record.impactTime }) }}</span>
              </div>
            </CollapseTransition>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <span
      class="pointer-events-none absolute bottom-0 left-1 text-xl font-black whitespace-nowrap text-[#5a5d5f] italic [font-synthesis:style] select-none md:text-4xl"
    >
      {{ title }}
    </span>
    <span
      class="pointer-events-none absolute right-1 bottom-0 flex items-center whitespace-nowrap text-[#5a5d5f] italic [font-synthesis:style] select-none"
    >
      <Counter
        :value="records.length"
        :font-size="isMobile ? 20 : 36"
        :font-weight="900"
        :gap="0"
        :horizontal-padding="0"
        :border-radius="0"
        :gradient-height="0"
        :digit-style="{ width: '1.3ch' }"
      />
      <span class="text-xl font-black md:text-4xl">/5</span>
    </span>
  </div>
</template>

<style scoped>
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
