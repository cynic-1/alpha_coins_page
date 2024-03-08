import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import App from './App.vue'

createApp(App).use(ElementPlus, { locale: zhCn }).mount('#app')
