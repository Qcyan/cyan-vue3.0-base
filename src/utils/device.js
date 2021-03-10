export function inBrowser() {
  return process.client || process.browser
}

// 获取当前设备信息
export function getCurrentDevice() {
  // 默认
  let device = {
    isWeChat: false, // 是否在微信端
    isWap: false, // 是否为移动设备
    isIPhone: false,
    isIPad: false,
    isAndroid: false,
    isPc: false, // 是否为电脑端
    isApp: false, // 是否为app端webview
    isServer: true // 是否在服务器端 预留ssr处理
  }

  // 浏览器内的规则
  if (inBrowser()) {
    const userAgent = navigator.userAgent
    const isWap = /iPhone|iPad|Android|Windows Phone|KFAPWI|MeeGo/ig.test(userAgent)
    const isWeChat = /MicroMessenger/ig.test(userAgent)
    device = {
      isWeChat,
      isWap,
      isIPhone: /iPhone/ig.test(userAgent),
      isIPad: /iPad/ig.test(userAgent),
      isAndroid: /Android/ig.test(userAgent),
      isPc: !isWap,
      isApp: false, // 是否为app端webview
      isServer: false
    }
  }

  return device
}

// 获取窗口的大小
function getClientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight
}

