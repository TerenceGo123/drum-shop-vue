<template>
  <div class="app p-10 max-xl:p-7 max-lg:p-5 max-md:p-2 max-sm:p-0">
    <div :class="{ 'content-container': true, 'content-container-auth': isAuthPage }" class="bg-white">
      <header-menu
        v-if="!isAuthPage"
        @searchAndFilter="sortedOfCategory"
        
      ></header-menu>
      <!-- <navbar v-if="!isAuthPage" :categories="drumStore.categories"></navbar> -->
      <main>
        <router-view ></router-view>
      </main>
      <my-footer v-if="!isAuthPage"></my-footer>
    </div>
  </div>
</template>

<script setup>
import HeaderMenu from "@/components/HeaderMenu.vue";
import Navbar from "@/components/Navbar.vue";
import MyFooter from "@/components/MyFooter.vue";
import { useDrumDataStore } from '@/stores/DrumData'
import { useUserDataStore } from "./stores/UserData";
import {computed, onMounted } from 'vue';
import { useRoute } from "vue-router";

const drumStore = useDrumDataStore()
const userStore = useUserDataStore()

const route = useRoute();

const isAuthPage = computed(() => {
  return route.name === 'reg' || route.name === 'sign';
});


const checkUser = async () => {
  const info = JSON.parse(localStorage.getItem('userInfoStorage'))
  if(info) {
      userStore.userInfo.token = info.token
      userStore.userInfo.refreshToken = info.refreshToken
      await userStore.fetchUserData()
    }
}

onMounted(async () => {
  await checkUser()
  console.log(isAuthPage.value);
  setTimeout(async () => {
    if(!isAuthPage.value ) {
      await drumStore.fetchDrumData()
    }
  }, 1000)

})

</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

button {
  border: none;
  cursor: pointer;
}

.app {
  width: 100%;
  margin: auto;
}


</style>
