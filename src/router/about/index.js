const about = {
  path: '/about',
  name: 'About',
  component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
}

export default about;
