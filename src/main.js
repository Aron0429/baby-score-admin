/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-25 15:51:23
 * @LastEditTime: 2025-11-25 16:32:26
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
