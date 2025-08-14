<template>
  <div class="app">
    <div :class="{ container: true, 'container-auth': isAuthPage }">
      <header-menu
        v-if="!isAuthPage"
        @searchAndFilter="sortedOfCategory"
      ></header-menu>
      <navbar v-if="!isAuthPage" :categories="drumStore.categories"></navbar>
      <router-view></router-view>
      <my-footer v-if="!isAuthPage"></my-footer>
    </div>
  </div>
</template>

<script setup>
import HeaderMenu from "@/components/Menu.vue";
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


// await drumStore.fetchDrumData();

onMounted(async () => {
  await checkUser()
  await drumStore.fetchDrumData()
  console.log("ЗАГРУЗИЛИСЬ");
})

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: TTNormsPro-R;
}

html {
  font-size: 16px;
}

body {
  background-color: $main-color;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}

.app {
  width: 100%;
  padding: 40px 0 40px 0;
}

.container {
  width: 90%;
  margin: 0 auto;
  padding: 40px;
  border-radius: 20px;
  background: $main-white-color;

  &-auth {
    padding: 0px;
    overflow: hidden;
  }
}
</style>
