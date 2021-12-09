import { lowerCase } from 'lodash-es'

type KeysCallback<T> = (key: T, keys: Array<T>) => void | boolean

/**
 * 获取对象自身可枚举属性的数组
 * @param obj
 */
export function keysArray<T extends Utils.Dict>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
}

/**
 * 遍历对象的 key 值
 * @param obj 目标对象
 * @param callback 遍历的回调
 * @returns 返回 true 可以提前停止遍历
 */
export function Objectkeys<T extends Utils.Dict>(
  obj: T,
  callback: KeysCallback<keyof T>,
) {
  const keys = keysArray(obj)
  keys.some((key) => callback(key, keys))
}

/**
 * 判断字符串是否相同
 * @param str1
 * @param str2
 * @description 判断忽略大小写
 */
export function strEquals(str1: string, str2: string) {
  return lowerCase(str1) === lowerCase(str2)
}

/**
 * 获取数字，如果不是数字或为空则返回 0
 * @param value
 */
export function getCurrentNum(value: string | number) {
  if (isNaN(+value)) {
    return 0
  }
  return +value
}
