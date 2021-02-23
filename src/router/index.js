import { createRouter, createWebHistory } from 'vue-router'

// 路由地址
import routes from './routes'


//const routes = [
//  {
//    path: '/',
//    component: () => import('@views/layout.vue'),
//    redirect: 'home',
//    children: [
//      {
//        path: 'home',
//        name: 'Home',
//        component: () => import('@views/Home.vue'),
//      }
//    ]
//  },
//  {
//    path: '/404',
//    component: () => import('@views/errorPage/404'),
//    hidden: true
//  },
//
//]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

