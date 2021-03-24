import errorCode from './errorCode'

// 错误码处理
export function errorHandle(opts = {}) {
  const { code, message } = opts
  switch (code) {
    // 未登录处理
    case errorCode.UN_LOGIN:
      //      unLogin()
      break

    // 未绑定手机号
    case errorCode.BIND_PHONE:
      //      bindPhone({
      //        to: router.currentRoute
      //      })
      break

    // 只做提醒操作
    case errorCode.MESSAGE:
      //      $toast({
      //        message: message
      //      })
      break

    // default
    default:
  }
}

