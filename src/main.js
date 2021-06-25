import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import Toaster from '@meforma/vue-toaster';
createApp(App).use(Toaster).mount('#app')
