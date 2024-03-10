import { nanoid } from 'nanoid'
import { computed, getCurrentScope, onScopeDispose, ref, watch } from 'vue-demi'
import { noop } from '@/utils'
import { toValue } from '@/utils/toValue'
import type { MaybeRefElement } from '@/utils/unrefElement'
import { unrefElement } from '@/utils/unrefElement'

export interface ResizeCallback {
  (entry: ResizeObserverEntry, observer: ResizeObserver): void
}

const scope = '__ResizeObserver__'

export function useResizeObserver(target: MaybeRefElement | MaybeRefElement[], callback: ResizeCallback, observeOptions: ResizeObserverOptions) {
  const isSupported = ref(window && 'ResizeObserver' in window)

  if (!isSupported.value) {
    return {
      isSupported,
      stop: noop,
    }
  }

  const observerId = nanoid()

  const targets = computed(() => {
    const _target = toValue(target)
    return Array.isArray(_target) ? _target.map(unrefElement) : [unrefElement(_target)]
  })

  let observer: ResizeObserver | null = new ResizeObserver((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
    entries.forEach((entry: ResizeObserverEntry) => {
      (entry.target as any)[scope][observerId](entry, observer)
    })
  })

  const stopWatch = watch(targets, (els) => {
    observer?.disconnect()

    els.forEach((el) => {
      if (el) {
        el[scope] = Object.assign({
          [observerId]: callback,
        }, el[scope])

        observer?.observe(el, observeOptions)
      }
    })
  }, { immediate: true, flush: 'post', deep: true })

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
