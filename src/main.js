/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-25 15:51:23
 * @LastEditTime: 2025-11-25 16:32:26
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router'
import App from './App.vue'

import './style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
