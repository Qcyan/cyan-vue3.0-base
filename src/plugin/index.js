import { useAxios } from '@/axios/index.js'
import useElement from './element-ui'

function plugin(app) {
  // element-plus UI
  useElement(app)

  // axios
  useAxios(app)
}

export default plugin
