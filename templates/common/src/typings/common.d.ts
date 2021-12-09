/** 公共类型集 */
declare namespace Utils {
  /** 字典类型 */
  type Dict<T = any> = Record<string, T>

  /** 分页器 */
  interface PageVO {
    page: number
    page_size: number
    total: number
  }

  type SearchVO = {
    page: number
    page_size: number
  }

  /** 响应体 */
  interface Result<T = null> {
    code: number // 0 为成功，否则为失败
    description: string // 错误信息
    data: T | null
  }

  type NoPager<T extends SearchVO> = Omit<T, keyof SearchVO>
}
