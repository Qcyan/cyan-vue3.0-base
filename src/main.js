import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@assets/js/rem.js'
import plugin from './plugin'
import { useVueComponents } from './vueComponents'

const app = createApp(App)
app.use(store)
app.use(router)

// 项目内引入的插件
plugin(app)

// 注册全局组件
useVueComponents(app)

app.mount('#app')

