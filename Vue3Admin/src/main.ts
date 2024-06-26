
import { createApp } from 'vue'
import store from './stores/index'
import App from './App.vue'
import router from './router'
import axios from "axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {permission} from "@/directive/permission/permission";
const app=createApp(App)
app.use(store).use(router).use(ElementPlus)
app.directive('permission',permission)
axios.defaults.baseURL = 'http://localhost:3000'

app.mount('#app')
