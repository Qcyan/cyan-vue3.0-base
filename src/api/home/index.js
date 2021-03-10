import $axios from '@/axios'

// 自助机参数读取
export const listPrinterConfigs = data => {
  return $axios({
    url: `/selfPrinterConfig/listPrinterConfigs`,
    method: 'GET',
    params: data
  })
}

export const user = () => {
  return $axios({
    url: `/mock/comment/get.action`,
    method: 'get',
  })
}
