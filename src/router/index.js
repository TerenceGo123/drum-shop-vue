import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import SignIn from "@/pages/SignIn.vue";
import Register from "@/pages/Register.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useUserDataStore } from "@/stores/UserData";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: "/cart",
    component: Cart,
    meta: {
      auth: true
    }
  },
  {
    path: "/sign",
    name: "sign",
    component: SignIn,
    meta: {
      auth: false
    }
  },
  {
    path: "/reg",
    name: "reg",
    component: Register,
    meta: {
      auth: false
    }
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});


router.beforeEach((to, from, next) => {
  const userDataStore = useUserDataStore()
  if(to.meta.auth && !userDataStore.userInfo.token) {
    next('/sign')
  }else if (!to.meta.auth && userDataStore.userInfo.token){
    next('/')
  }
  else {
    next()
  }
  
})

export default router;
