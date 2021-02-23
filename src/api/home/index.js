import $axios from '@/axios'

// 自助机参数读取
export const listPrinterConfigs = data => {
  return $axios({
    url: `/selfPrinterConfig/listPrinterConfigs`,
    method: 'GET',
    params: data
  })
}
