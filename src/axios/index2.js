import { App } from 'vue';
import Request from './request';
import appRequire from './request/appReqiure';
const request = new Request();
request.extend(appRequire);
request.merge();

request.install = (app, ...options) => {
  app.config.globalProperties.$request = request;
};
export default request;
