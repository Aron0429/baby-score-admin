/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-25 15:51:23
 * @LastEditTime: 2025-11-25 16:01:43
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
