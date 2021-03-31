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
  },
  {
    path: '',
    redirect: 'home',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      }
    ]
  }

]

export const asyncRoutes = routes

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

export default router

