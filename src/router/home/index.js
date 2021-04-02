import Layout from '@/components/layouts/Layout'

const home = {
  path: '/',
  component: Layout,
  redirect: 'home',
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: '首页',
        icon: 'home',
        affix: true
      }
    }
  ]
}

/* {
  path: "/test",
  component: Layout,
  redirect: "noRedirect",
  children: [
    {
      path: "test",
      name: "Test",
      component: () => import("@/views/test/index"),
      meta: {
        title: "test",
        icon: "marker",
        permissions: ["admin"],
      },
    },
  ],
}, */

export default home

