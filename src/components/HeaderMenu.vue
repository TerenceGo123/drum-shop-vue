<template>
  <div>
    <header class="header max-md:mb-4! flex items-center">
      <router-link class=" w-1/20 max-sm:w-1/7" to="/"><img src="@/assets/DrumLogo.svg" class="" /></router-link>
      
      <div class="relative w-2/5 max-w-[450px] max-md:w-2/5 max-sm:w-3/5">
        <div class="flex bg-main-color items-center px-5 py-3 rounded-lg max-md:px-2 max-md:py-2 max-sm:px-1.5 max-sm:py-1 ">
          <input
            type="text"
            v-model="drumStore.searchQuery"
            placeholder="Поиск..."
            class="input max-sm:text-xs! "
            @focus="searchFocus = true" @blur="searchFocus = false"
            @keyup.enter="handleSearch()"
          />
          <img class="w-6 h-6 cursor-pointer hover:scale-105 max-md:w-5 max-md:h-5" src="/ICONS/Huge-icon.svg" alt="" @click="handleSearch() ">
        </div>
        <transition
            name="fade"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
        <div class=" z-40 absolute top-15 w-full  rounded-lg bg-main-color p-1.5 shadow-md" v-if="drumStore.searchQuery != '' && searchFocus"  >
          <div v-for="item in sortedSearch" :key="item.id" class="flex justify-between mb-2 last:m-0 bg-white p-2 rounded-lg hover:bg-black/5 transition-all cursor-pointer" @mousedown="router.push(`/category/${item.category}/${item.id}`)" >
            <div class="w-3/10 ">
              <img :src="item.img" alt=""  class="w-full">
            </div>
            <div class="w-6/10">
              <p class="mb-2">{{ item.title }}</p>
              <p class="font-norms-b! inline mr-3" >${{ item.price }}</p>
              <p v-if="item.oldPrice" class="line-through text-stroke-color inline">{{ item.oldPrice }}</p>
            </div>
          </div>
          <div v-if="sortedSearch.length != 0">
            <MyButton @mousedown="handleSearch()">СМОТРЕТЬ РЕЗУЛЬТАТЫ</MyButton>
          </div>
          <p v-else>
            Ничего не нашлось
          </p>
        </div>
        </transition>
      </div>
      <div class="user-action max-md:w-20! max-sm:w-14!">
        <div class="cart-container cursor-pointer z-20 hover:scale-[103%]"   @click="$router.push('/cart')">
          <button  class="button-cart max-md:scale-100! max-sm:scale-70!">
            <img src="/ICONS/ShoppingBag.svg"  />
          </button>
          <div v-show="userStore.userInfo.cart.length != 0" class="sircle bg-orange-color max-md:text-sm! max-sm:text-xs max-sm:w-4! max-sm:h-4!">{{ userStore.userInfo.cart.length }}</div>
        </div>
        <div class="relative">
          <div class="user-avatar z-20 relative max-md:w-10! max-md:h-10! max-sm:w-5! max-sm:h-5!"  tabindex="0" @focus="userUpDownOpen = true" @blur="userUpDownOpen = false">
            <img src="@/assets/ava.jpg" alt="" />
          </div>

          
          <transition
            name="fade"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
          <div v-if="userUpDownOpen" class="upDown absolute  w-60 z-10 bg-main-color right-0  top-16  rounded-2xl p-1.5">
            <div class="w-full h-full bg-white rounded-2xl p-2 ">
              <div class=" mb-2">
                <p class="text-2xl font-norms-b! text-orange-color text-center mb-2">АЛЕКСАНДР<br>ТОКАРЕВ</p>
                <hr class=" border-stroke-color">
              </div>
              <div class="upDownItem">
                <div class="mr-3">
                  <img src="/ICONS/User.svg" class="mx-auto scale-125"/>
                </div>
                <p class="text-xl text-dark-gray-color w-5/10">Профиль</p>
              </div>
              <div class=" upDownItem">
                <div class="mr-3" >
                  <img src="/ICONS/Settings.svg" class="mx-auto scale-125"/>
                </div>
                <p class="text-xl text-dark-gray-color w-5/10">Настройки</p>
              </div>
              <div class=" upDownItem mb-2!">
                <div class="mr-3">
                  <img src="/ICONS/Info.svg" class="mx-auto scale-125"/>
                </div>
                <p class="text-xl text-dark-gray-color w-5/10">Помощь</p>
              </div>
              <hr class=" border-stroke-color mb-2">
              <div class="upDownItem hover:bg-white!">
                <div class="mr-3">
                  <img src="/ICONS/Exit.svg" class="mx-auto scale-125"/>
                </div>
                <p class="text-xl text-red-600 w-5/10 hover:text-red-500" @click="logout">Выход</p>
              </div>
            </div>
          </div>
          </transition>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useDrumDataStore } from '@/stores/DrumData'
import { useUserDataStore } from '@/stores/UserData';
import {computed, ref} from 'vue'
import MyButton from './UI/MyButton.vue';


const drumStore = useDrumDataStore()
const userStore = useUserDataStore()

const router =  useRouter()

const searchFocus = ref(false)
const userUpDownOpen = ref(false) 

const sortedSearch = computed(() => {
    if (drumStore.searchQuery=== "") {
        return
    } else {
        return drumStore.items.filter(item => item.title.toLowerCase().includes(drumStore.searchQuery.toLowerCase())).slice(0, 3);
    }
});


const handleSearch = () => {
  if (!drumStore.searchQuery) return
  router.push({
    path: '/search',
    query: {
      q: drumStore.searchQuery,
    }
  });
  searchFocus.value = false
};

const logout = () => {
  localStorage.removeItem('userInfoStorage')
  userStore.logout()
  router.push('/sign')
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.cart-container {
  align-content: center;
  position: relative;
}

.sircle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 12px;
  text-align: center;
}

.button-cart {
  background: none;
  border: none;
  cursor: pointer;
  scale: 1.2;
}

.input {
  width: 100%;
  border: none;
  font-size: 16px;
  line-height: 150%;
  outline: none;
}

.user-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
