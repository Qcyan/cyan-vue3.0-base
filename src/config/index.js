import * as utils from '@/utils/util.js'
import { getCurrentDevice } from '@/utils/device'

const config = {
  // 一些常用的方法
  ...utils,
  // 设备
  device: getCurrentDevice(),
  // 视图相关
  view: {
    title: '叫号屏'
  }
}

export default config

