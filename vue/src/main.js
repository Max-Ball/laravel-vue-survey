import { createApp } from 'vue'
import './style.css'
import './index.css'
import store from './store'
import router from './router'
// @ts-ignore
import App from './App.vue'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
