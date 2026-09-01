<script setup lang="ts">
import type { LocaleCode } from '../i18n'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { Check, Languages } from 'lucide-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, SUPPORTED_LANGUAGES } from '../i18n'

const { t, locale } = useI18n()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function choose(code: LocaleCode) {
  setLocale(code)
  close()
}

onClickOutside(rootRef, close)
onKeyStroke('Escape', close)
</script>

<template>
  <div ref="rootRef" class="dropdown">
    <button
      type="button"
      :aria-label="t('language.ariaLabel')"
      class="btn btn-circle btn-lg btn-ghost"
      @click="toggle"
    >
      <Languages class="h-6 w-6" />
    </button>
    <Transition name="dropdown-fade">
      <ul
        v-show="open"
        class="menu dropdown-content max-h-96 w-56 flex-nowrap overflow-y-auto rounded-lg bg-base-100 p-2 md:left-auto md:right-0"
      >
        <li v-for="lang in SUPPORTED_LANGUAGES" :key="lang.code">
          <button
            type="button"
            class="justify-between"
            :class="{ active: lang.code === locale }"
            @click="choose(lang.code)"
          >
            <span>{{ lang.name }}</span>
            <Check v-if="lang.code === locale" class="h-4 w-4 shrink-0" />
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
