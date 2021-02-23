import ElementPlus from 'element-plus'
import { setLoading } from './loading'
import 'element-plus/lib/theme-chalk/index.css'

export default function useElement(app) {
  app.use(ElementPlus)

  // 全局挂载loading
  setLoading(app)
}
