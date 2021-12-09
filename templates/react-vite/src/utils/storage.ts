import Cookies from 'js-cookie'

import config from '@/config'

const { namespace } = config

/**
 * storage封装
 */
const storage = {
  /** 存储值 */
  setItem(key: string, value: unknown, moduleName?: string) {
    if (moduleName) {
      const val = this.getItem(moduleName)
      if (val) {
        val[key] = value
        this.setItem(moduleName, val)
      } else {
        const obj = { [key]: value }
        this.setItem(moduleName, obj)
      }
    } else {
      const val = this.getStorage()
      val[key] = value
      window.localStorage.setItem(namespace, JSON.stringify(val))
    }
  },
  /**
   * 获取值
   * 获取某一模块下面的属性user下面的userName
   */
  getItem<T = any>(key: string, moduleName?: string): T | undefined {
    if (moduleName) {
      const val = this.getItem(moduleName)
      if (val) return val[key]
    }
    return this.getStorage()[key]
  },
  /** 获取浏览器中的缓存信息 */
  getStorage(): Utils.Dict {
    const localOrigin = window.localStorage.getItem(namespace)
    if (localOrigin) {
      const local = JSON.parse(localOrigin)
      const token = Cookies.get('Token')
      if (token && local.token === token) {
        return local
      }
      this.clearAll()
    }
    return {}
  },
  /** 移除某个 storage */
  remove(key: string, moduleName?: string) {
    const val = this.getStorage()
    if (moduleName) {
      if (!val[moduleName]) return
      delete val[moduleName][key]
    } else {
      delete val[key]
    }
    window.localStorage.setItem(namespace, JSON.stringify(val))
  },
  /** 清空 */
  clearAll() {
    window.localStorage.removeItem(namespace)
  },
}

export default storage
