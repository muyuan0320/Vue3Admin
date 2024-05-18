import './assets/base.css'
import { createApp } from 'vue'
import store from './stores/index'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
