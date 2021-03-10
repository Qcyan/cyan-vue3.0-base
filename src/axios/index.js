import axios from 'axios'
import errorCode from './errorCode' // 错误码
import errorHandle from './errorHandle' // 错误码处理
import { $loading, $closeLoading } from '@plugin/element-ui/loading'

let loadingInstance

// 柯里化 axios
const $axios = axios.create({
//  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'// "该请求是 AJAX 异步HTTP请求
    // 'Content-Type': 'application/json'
  }
})

// 拦截request
requestInterceptors()

// 拦截response
responseInterceptors()

// request interceptors
function requestInterceptors() {
  $axios.interceptors.request.use((axiosConfig) => {
    //    loadingInstance = ElLoading.service()
    // axios proxy
    setProxy(axiosConfig)

    $loading()
    return axiosConfig
  })
}
// response interceptors
function responseInterceptors() {
  $axios.interceptors.response.use((res) => {
    const status = res.status // 接口状态码
    const axiosConfig = res.config // 请求参数
    //    loadingInstance.close()
    $closeLoading()
    return res

    //    if (status === 200) {
    //      const { code, message } = res.data
    //      if (code === errorCode.SUCCESS) {
    //        return res
    //      } else {
    //        errorHandle(res.data)
    //        // 这里最好的就是reject吧
    //        return Promise.reject(res)
    //      }
    //    }
  }, (error) => {
    return Promise.reject(error)
  })
}

export function useAxios(app) {
  app.config.globalProperties.$Axios = $axios
}

// ssr axios proxy
function setProxy(axiosConfig) {
  let url = axiosConfig.url

  console.log(url)
  let baseUrl = [
    /^\/api/,
    /^\/mock/
  ]
  let hasBaseUrl = false
  for (let i = 0; i < baseUrl.length; i++) {
    if (baseUrl[i].test(url)) {
      hasBaseUrl = true
      break
    }
  }
  if (!hasBaseUrl) axiosConfig.url = `/api/pacs${url}`
}

export default $axios

