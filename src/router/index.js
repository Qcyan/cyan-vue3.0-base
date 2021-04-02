import { createRouter, createWebHistory } from 'vue-router'
// 路由地址
import routes from './routes'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@views/errorPage/404'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@views/errorPage/404'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@views/errorPage/404'),
    hidden: true
  }
]

export const asyncRoutes = routes

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // 需要做权限动态加载路由时
  // routes: constantRoutes
  // 加载全部路由
  routes: [
    ...routes,
    ...constantRoutes
  ]
})

// 重置为初始路由
export function resetRouter() {
  router.matcher = createRouter({
    routes: constantRoutes
  }).matcher
}

export default router

