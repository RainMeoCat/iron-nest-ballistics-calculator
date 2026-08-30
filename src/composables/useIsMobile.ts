import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useIsMobile(query = '(max-width: 767.98px)') {
  const isMobile = ref(false)
  let mediaQuery: MediaQueryList | undefined

  function update() {
    isMobile.value = mediaQuery?.matches ?? false
  }

  onMounted(() => {
    mediaQuery = window.matchMedia(query)
    update()
    mediaQuery.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', update)
  })

  return isMobile
}
