
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index.js'
import axios from 'axios'
//import Name from '/src/class/controller.js'

const app = createApp(App)
app.use(router)
app.config.globalProperties.$axios = axios
app.mount('#app')