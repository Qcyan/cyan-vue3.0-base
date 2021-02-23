const home = {
  path: '/',
  component: () => import('@/views/layout.vue'),
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    }
  ]
}

export default home

