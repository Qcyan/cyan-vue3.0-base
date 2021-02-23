import { createRouter, createWebHistory } from 'vue-router'

// 路由地址
import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

