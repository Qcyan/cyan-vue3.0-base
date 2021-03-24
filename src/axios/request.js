import { App } from 'vue'
import axios from 'axios'
import _merge from 'lodash/merge'
import apiConfig from '@/api.config'

export const _request = (config) => {
  let baseURL = ''
  config.branch = config.branch || 'mock'
  console.log('process.env.MY_ENV', process.env.MY_ENV)
  // 开发模式开启代理
  if (process.env.NODE_ENV === 'development') {
    config.url = `/${config.branch}${config.url}` // /mock/comment/get.action
  } else {
    // 不使用proxy时,配置请求地址与域名一致
    baseURL = apiConfig(process.env.MY_ENV, config.branch) // 例如传入'test','mock'
  }

  return axios.request(_merge({
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      token: 'xxx'
    }
  },
  { baseURL },
  config
  )).then((res) => {
    const data = res.data
    if (data && res.status === 200) {
      // 开始验证请求成功的业务错误，弹框进行全局提示
      // validator.start(config.branch!, data, config);
      return data
    }
    return Promise.reject(new Error('Response Error'))
  }).catch((error) => {
    // 请求相关的错误，这里可用弹框进行全局提示
    return Promise.reject(error)
  })
}

/**
 * @desc 请求方法类封装
 */
class Request {
  // request 要被作为一个插件，需要有 install 方法
  // public install: (app: App, ...options: any[]) => any;
  install(app, ...options) {}
  constructor() {
    this.extends = [] // 存储所有请求类型的请求配置
    // this.install = () => {}
  }

  extend(extend) {
    this.extends.push(extend)
    return this
  }

  merge() {
    const obj = this.extends.reduce((prev, curr) => {
      return _merge(prev, curr)
    }, {})
    Object.keys(obj).forEach(key => {
      Object.assign([key], obj[key])
    })
    console.log(obj)
  }

  get(path, data = {}, config = {}) {
    return _request({
      method: 'GET',
      url: path,
      params: data,
      ...config
    })
  }

  post(path, data = {}, config = {}) {
    return _request({
      method: 'POST',
      url: path,
      ...config,
      data
    })
  }
}
export default Request
