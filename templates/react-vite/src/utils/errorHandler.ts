/**
 * 错误码分析
 */
export const errorHandler = (message: string) => {
  const code = parseInt(message.replace(/[^0-9]/gi, ''))
  const msgTypes = new Map([
    [401, '您没有访问的权限'],
    [404, '您所请求的资源无法找到'],
    [500, '服务器内部错误，无法完成请求'],
    [
      502,
      '作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应',
    ],
    [504, '服务请求超时'],
  ])
  const errorMsg = msgTypes.get(code)
  return errorMsg ? `${code}：${errorMsg}` : '服务器出现未知错误'
}
