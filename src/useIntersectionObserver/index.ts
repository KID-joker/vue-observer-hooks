import { nanoid } from 'nanoid'
import { computed, getCurrentScope, onScopeDispose, ref, watch } from 'vue-demi'
import { noop } from '@/utils'
import { toValue } from '@/utils/toValue'
import type { MaybeRefElement } from '@/utils/unrefElement'
import { unrefElement } from '@/utils/unrefElement'

export interface IntersectionInit {
  root?: MaybeRefElement | Document | null
  rootMargin?: string
  threshold?: number | number[]
}

export interface IntersectionCb {
  (entry: IntersectionObserverEntry, observer: IntersectionObserver): void
}

const scope = '__IntersectionObserver__'

export function useIntersectionObserver(target: MaybeRefElement | MaybeRefElement[], callback: IntersectionCb, initOptions: IntersectionInit = {}) {
  const isSupported = ref(window && 'IntersectionObserver' in window)

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

  const { root, rootMargin, threshold } = initOptions
  let observer: IntersectionObserver | null = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      (entry.target as any)[scope][observerId](entry, observer)
    })
  }, {
    root: root && unrefElement(root),
    rootMargin,
    threshold,
  })

  const stopWatch = watch(targets, (els) => {
    observer?.disconnect()

    els.forEach((el) => {
      if (el) {
        el[scope] = Object.assign({
          [observerId]: callback,
        }, el[scope])

        observer?.observe(el)
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
