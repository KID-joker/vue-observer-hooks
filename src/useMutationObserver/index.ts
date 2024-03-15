import { nanoid } from 'nanoid'
import { getCurrentScope, onScopeDispose, ref, watch } from 'vue-demi'
import { noop } from '../utils'
import type { MaybeRefElement } from '../utils/unrefElement'
import { unrefElement } from '../utils/unrefElement'

export interface MutationCb {
  (mutation: MutationRecord, observer: MutationObserver): void
}

const scope = '__MutationObserver__'

export function useMutationObserver(target: MaybeRefElement, callback: MutationCb, observeOptions?: MutationObserverInit) {
  const isSupported = ref(window && 'MutationObserver' in window)

  if (!isSupported.value) {
    return {
      isSupported,
      stop: noop,
    }
  }

  const observerId = nanoid()

  let observer: MutationObserver | null = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
    mutations.forEach((mutation: MutationRecord) => {
      (mutation.target as any)[scope][observerId](mutation, observer)
    })
  })

  const stopWatch = watch(() => unrefElement(target), (el) => {
    observer?.disconnect()

    if (el) {
      el[scope] = Object.assign({
        [observerId]: callback,
      }, el[scope])

      observer?.observe(el, observeOptions)
    }
  }, { immediate: true })

  const cleanup = () => {
    observer?.disconnect()
    observer = null
  }

  const stop = () => {
    stopWatch()
    cleanup()
  }

  if (getCurrentScope())
    onScopeDispose(stop)

  return {
    isSupported,
    stop,
  }
}
