import { App } from 'vue'
import Request from './request'

import mockReqiure from './request/mockReqiure'

const request = new Request()
request.extend(mockReqiure)
request.merge()
// request.extend(mockReqiure).extend(mockReqiure2);

request.install = (app, ...options) => {
  app.config.globalProperties.$request = request
}

export default request
