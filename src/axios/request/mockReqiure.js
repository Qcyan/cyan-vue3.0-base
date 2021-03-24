// src/plugins/request/branchs/jianshu
import { _request } from '../request'
const appRequire = {
  get: {
    mock(path, data = {}, config = {}) {
      return _request({
        ...config,
        method: 'GET',
        url: path,
        data,
        branch: 'mock',
        // 在headers 加入 token 之类的凭证
        headers: {
          'my-token': 'jianshu-test'
        }
      })
    }
  },
  post: {
    mock(path, data = {}, config = {}) {
      return _request({
        ...config,
        method: 'POST',
        url: path,
        data,
        branch: 'mock',
        // 在headers 加入 token 之类的凭证
        headers: {
          'my-token': 'jianshu-test'
        }
      })
    }
  }
}

export default appRequire
