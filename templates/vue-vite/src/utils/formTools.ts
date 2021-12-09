import { cloneDeep, pick } from 'lodash-es'

/**
 * 清空表单，仅对对象第一层做处理
 * @param target
 */
export function formDataClean<T extends Utils.Dict>(target: T) {
  const obj = cloneDeep(target) as Utils.Dict
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'string') {
      obj[key] = ''
    }
  })
  return obj as T
}

/**
 * 检查手机号合法性
 * @param phone
 */
export function checkMobileNumber(phone: string) {
  const reg = /(1[3-9]\d{9}$)/
  return reg.test(phone)
}

/**
 * 检查邮箱的合法性
 * @param email
 */
export function checkEmailFormat(email: string) {
  const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
  return reg.test(email)
}

// 手机验证码合法性校验
export function checkVerifyValidity(verify: string) {
  if (verify.length !== 4) {
    return false
  }
  if (isNaN(+verify)) {
    return false
  }
  return true
}

/**
 * 下载文件
 * @param data 文件流
 * @param fileName 文件名
 * @param suffix 后缀名
 */
export function downloadFile(data: BlobPart, fileName: string, suffix: string) {
  const blob = new Blob([data])
  const fullName = fileName + suffix
  const elink = document.createElement('a')
  elink.download = fullName
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href)
  document.body.removeChild(elink)
}

/**
 * 筛选返回数据中的分页信息
 * @param obj
 */
export function pagerSetter<T extends Utils.PageVO>(obj: T) {
  return pick(obj, ['page', 'page_size', 'total'])
}
