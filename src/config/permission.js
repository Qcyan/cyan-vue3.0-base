import router from '@/router'
import store from '@/store'
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'

let {
  authentication,
  loginInterception,
  progressBar,
  recordRoute,
  routesWhiteList
} = require('@/config/setting.config.js')

VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false
})
router.beforeEach(async(to, from, next) => {
  if (progressBar) VabProgress.start()
  let hasToken = store.getters['user/accessToken']

  if (!loginInterception) hasToken = true

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      if (progressBar) VabProgress.done()
    } else {
      const hasPermissions = store.getters['user/permissions'] && store.getters['user/permissions'].length > 0
      if (hasPermissions) {
        next()
      } else {
        try {
          // 获取权限
          let permissions
          if (!loginInterception) {
            // settings.js loginInterception为false时，创建虚拟权限
            await store.dispatch('user/setPermissions', ['admin'])
            permissions = ['admin']
          } else {
            permissions = await store.dispatch('user/getUserInfo')
          }

          // 获取对应的路由
          let accessRoutes = []

          if (authentication === 'intelligence') {
            // 后端权限只控制permissions
            accessRoutes = await store.dispatch('routes/setRoutes', permissions)
          } else if (authentication === 'all') {
            // accessRoutes = await store.dispatch('routes/setAllRoutes')
          }

          // 添加路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch {
          console.log('catch done')
          await store.dispatch('user/resetAccessToken')
          if (progressBar) VabProgress.done()
        }
      }
    }
  }
  next()
})
router.afterEach(() => {
  if (progressBar) VabProgress.done()
})
console.log(router)
