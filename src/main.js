import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseSearch from './components/BaseSearch'
import BaseManageItem from './components/BaseManageItem'

const app = createApp(App)
app.component('base-search', BaseSearch)
app.component('base-manage-item', BaseManageItem)
app.use(router).mount('#app')