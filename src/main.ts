import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { registerBaseComponents } from '@/utils'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import '@/main.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Vue3Toastify)
registerBaseComponents(app)

app.mount('#app')

app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', { error: err, component: vm, info: info })
  // * We can add a custom error handling here or use Sentry or any other service,
}
