import { defineNuxtPlugin } from '#imports'
import { shallowRef } from 'vue'
import { slidOverInjectionKey } from '../ui-dev/src/runtime/composables/useSlideover'
import type { SlideoverState } from '../ui-dev/src/runtime/types/slideover'

export default defineNuxtPlugin((nuxtApp) => {
  const slideoverState = shallowRef<SlideoverState>({
    component: 'div',
    props: {}
  })

  nuxtApp.vueApp.provide(slidOverInjectionKey, slideoverState)
})
