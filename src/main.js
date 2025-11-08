import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import { initializeApp } from "firebase/app";
import './api'
import './output.css'

const firebaseConfig = {
  apiKey: "AIzaSyAD7trVpszBqSH1GnpCEPIdAkOoMGZW7gM",
  authDomain: "my-drum-store.firebaseapp.com",
  projectId: "my-drum-store",
  storageBucket: "my-drum-store.firebasestorage.app",
  messagingSenderId: "993028920039",
  appId: "1:993028920039:web:00a894c106c71b8ae84842"
};


initializeApp(firebaseConfig);

const app = createApp(App)
const pinia = createPinia() 

// components.forEach(component => {
//     app.component(component.name, component)
// })

app.use(router).use(pinia).mount('#app')
