/*
* 注册全局组件
 */

import CeViewTransition from './ce-view-transition/ce-view-transition.vue'
import CeTransition from './ce-transition/ce-transition.vue'
import CeSwiperScroll from './ce-swiper-scroll/ce-swiper-scroll.vue'

export function useVueComponents(app) {
  app.component('ce-view-transition', CeViewTransition)
  app.component('ce-transition', CeTransition)
  app.component('ce-swiper-scroll', CeSwiperScroll)
}
