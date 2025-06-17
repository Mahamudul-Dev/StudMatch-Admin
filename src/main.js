// import './assets/main.css'
import './assets/style.css'
import "preline/preline";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import toastPlugin from './plugins/toastPlugin';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(toastPlugin)
app.mount('#app')
