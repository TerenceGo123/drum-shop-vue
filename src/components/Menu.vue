<template>
  <div>
    <header class="header">
      <router-link to="/"><img src="@/assets/DrumLogo.svg" /></router-link>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Поиск..."
        class="input"
      />
      <div class="user-action">
        <div class="cart-container">
          <button v-show="userStore.userInfo.cart.length != 0" class="button-cart">
            <img src="/ShoppingBag.svg" @click="$router.push('/cart')" />
          </button>
          <div v-show="userStore.userInfo.cart.length != 0" class="sircle">{{ userStore.userInfo.cart.length }}</div>
        </div>
        <div class="user-avatar" @click="logout">
          <img src="@/assets/ava.jpg" alt="" />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useDrumDataStore } from '@/stores/DrumData'
import { useUserDataStore } from '@/stores/UserData';
import {computed} from 'vue'

const drumStore = useDrumDataStore()
const userStore = useUserDataStore()

const router =  useRouter()

const searchQuery = computed({
  get: () => drumStore.searchQuery, // Получаем значение из хранилища
  set: (value) => drumStore.searchQuery = value // Устанавливаем значение в хранилище
});

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
  background: $orange-color;
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
  padding: 12px 20px;
  width: 40%;
  max-width: 400px;
  border: none;
  background: $main-color;
  border-radius: 8px;
  font-size: 16px;
  line-height: 150%;
  outline: none;
}

.user-action {
  display: flex;
  justify-content: space-between;
  width: 100px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
