import { ElLoading } from 'element-plus'

let lastLoading

// set Loading in Vue
export function setLoading(app) {
  app.config.globalProperties.$Loading = $loading
  app.config.globalProperties.$closeLoading = $closeLoading
}

// 开启loading
export function $loading(opts) {
  $closeLoading()
  lastLoading = ElLoading.service(opts)
}

// 关闭loading
export function $closeLoading() {
  if (lastLoading) {
    lastLoading.close()
  }
}
