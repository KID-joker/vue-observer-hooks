import type { ComponentPublicInstance, ComputedRef } from 'vue-demi'
import type { MaybeRefOrGetter } from './toValue'
import { toValue } from './toValue'

export type ElementType = HTMLElement | Element | Window | Document | ComponentPublicInstance
export type MaybeRefOrGetterElement<T extends ElementType = ElementType> = MaybeRefOrGetter<T>
export type ComputedRefElement<T extends ElementType = ElementType> = ComputedRef<T>
export type MaybeRefElement<T extends ElementType = ElementType> = MaybeRefOrGetterElement<T> | ComputedRefElement<T>

export function unrefElement<T extends ElementType>(el: MaybeRefElement<T>) {
  const plain = toValue(el)
  return (plain as ComponentPublicInstance)?.$el ?? plain
}
