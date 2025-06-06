import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import DataVVue3 from '@kjgl77/datav-vue3'
import router from '@/router'
import { ConfigProvider, Image } from 'ant-design-vue'

const app = createApp(App)

app.use(DataVVue3)

app.use(router)
app.use(ConfigProvider)
app.use(Image)

app.mount('#app')
