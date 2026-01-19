import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import SignIn from "@/pages/SignIn.vue";
import Register from "@/pages/Register.vue";
import { createRouter, createWebHistory } from "vue-router";
import ItemPage from "@/pages/ItemPage.vue";
import CategoriesItems from "@/pages/CategoriesItems.vue";
import Categories from "@/pages/Categories.vue";
import SortedSearchPage from "@/pages/SortedSearchPage.vue"
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
  {
    path: "/category",
    component: Categories,
    meta: {
      auth: true
    }
  },  
  {
    path: "/category/:name",
    component: CategoriesItems,
    meta: {
      auth: true
    }
  },
  {
    path: "/category/:name/:id",
    component: ItemPage,
    meta: {
      auth: true
    },
  },
  {
    path: "/search",
    component: SortedSearchPage,
    meta: {
      auth: true
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),

  scrollBehavior(to, from, savedPosition) {
    // Всегда скроллить наверх при переходе
    if (savedPosition) {
      return savedPosition
    }
    
    // Иначе скроллить наверх
    return { top: 0 }
  }
});


// router.beforeEach((to, from, next) => {
//   const userDataStore = useUserDataStore()
//   if(to.meta.auth && !userDataStore.userInfo.token) {
//     next('/sign')
//   }else if (!to.meta.auth && userDataStore.userInfo.token){
//     next('/')
//   }
//   else {
//     next()
//   }
  
// })

export default router;
