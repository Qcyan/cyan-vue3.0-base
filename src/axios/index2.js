import { App } from 'vue'
import Request from './request'

import mockReqiure from './request/mockReqiure'

const request = new Request()
request.extend(mockReqiure)
// request.extend(mockReqiure).extend(mockReqiure2);
request.merge()

request.install = (app, ...options) => {
  app.config.globalProperties.$request = request
}

console.log(request)

export default request
