import { defineNuxtPlugin } from '#imports'
import { shallowRef } from 'vue'
import { modalInjectionKey } from '../ui-dev/src/runtime/composables/useModal'
import type { ModalState } from '../ui-dev/src/runtime/types/modal'

export default defineNuxtPlugin((nuxtApp) => {
  const modalState = shallowRef<ModalState>({
    component: 'div',
    props: {}
  })

  nuxtApp.vueApp.provide(modalInjectionKey, modalState)
})