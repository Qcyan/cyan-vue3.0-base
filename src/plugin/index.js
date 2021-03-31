import { useAxios } from '@/axios/index.js'
import useElement from './element-ui'
import '@/config/permission'

function plugin(app) {
  // element-plus UI
  useElement(app)

  // axios
  useAxios(app)

}

export default plugin
