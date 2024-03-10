import { unref } from 'vue-demi'
import type { ComputedRef, Ref } from 'vue-demi'
import { isFunction } from '.'

export type MaybeRef<T = any> = T | Ref<T>
export type MaybeRefOrGetter<T = any> = MaybeRef<T> | (() => T)

export function toValue<T>(source: MaybeRefOrGetter<T> | ComputedRef<T>): T {
  return isFunction(source) ? source() : unref(source)
}
