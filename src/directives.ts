import type { ObjectDirective } from 'vue-demi'
import { isVue3 } from 'vue-demi'
import { isFunction } from './utils'
import type { IntersectionCb, IntersectionInit, MutationCb, ResizeCb } from '.'
import { useIntersectionObserver, useMutationObserver, useResizeObserver } from '.'

type BindingValueFunction = IntersectionCb | MutationCb | ResizeCb
type BindingValueArray = [IntersectionCb, IntersectionInit] | [MutationCb, MutationObserverInit] | [ResizeCb, ResizeObserverOptions]

const DirectiveHooks = {
  mounted: (isVue3 ? 'mounted' : 'inserted') as 'mounted',
  updated: (isVue3 ? 'updated' : 'componentUpdated') as 'updated',
  unmounted: (isVue3 ? 'unmounted' : 'unbind') as 'unmounted',
}

function createObserverDirective(observerFn: Function): ObjectDirective<
HTMLElement,
BindingValueFunction | BindingValueArray
> {
  return {
    [DirectiveHooks.mounted](el, binding) {
      if (isFunction(binding.value))
        observerFn(el, binding.value)
      else
        observerFn(el, ...binding.value)
    },
  }
}

export const vIntersectionObserver = createObserverDirective(useIntersectionObserver)
export const vMutationObserver = createObserverDirective(useMutationObserver)
export const vResizeObserver = createObserverDirective(useResizeObserver)
