import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@assets/js/rem.js'
import plugin from './plugin'
import { useVueComponents } from './vueComponents'
import config from '@/config'
import request from '@/axios/index2';

// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//  mockXHR()
// }

const app = createApp(App)
app.use(store)
app.use(router)
app.use(request)
app.config.globalProperties.$config = config

// 项目内引入的插件
plugin(app)

// 注册全局组件
useVueComponents(app)

app.mount('#app')

