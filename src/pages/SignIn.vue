<template>
    <div class="login" @submit.prevent="handleSubmit">
        <div class="content">
            
            <form class="login-form">
                <div class=" bg-orange-color text-orange-dark-color mb-3 p-2 2xl:text-lg ">
                    <p>LOGIN: presentor@mail.com<br>PASSWORD: presentor</p>
                </div>
                <p class="error-mesage" v-if="userDataStore.error" >{{ userDataStore.error }}</p>
                <h1 class="login-title">ВХОД</h1>
                <input type="text" placeholder="Почта" v-model="login" class="login-input">
                <input type="password" placeholder="Пароль" v-model="password" class="login-input">
                <div class="remember-me ">
                    <input type="checkbox" id="remember-me" class="remember-me-checkbox" v-model="userDataStore.rememberMe">
                    <label for="remember-me" class="remember-me-label" >Запомнить Меня</label>
                </div>
                <div v-if="userDataStore.loader" style="text-align: center;">
                    <span  class="loader"></span>
                </div>
                <my-button class="mb-3" v-else @click="singIn" :type="'submit'" :ico="'/ICONS/Enter.svg'" >ВОЙТИ</my-button>
                <div class="auth-prompt">
                    <p class="auth-prompt__text">Нет аккаунта?</p>
                    <router-link class="auth-prompt__link" to="/reg">Зарегистрироваться</router-link>
                </div>
            </form>
        </div>
        
        <div class="login-image-container bg-[url('../public/SingInImage.png')]"></div>
    </div> 
</template>

<script setup>
import { ref } from 'vue';
import { useUserDataStore } from '@/stores/UserData';
import { useRouter } from 'vue-router';
import MyButton from '@/components/UI/MyButton.vue';

const userDataStore = useUserDataStore() 
const router = useRouter()

const login = ref('')
const password = ref('') 


const singIn = async () => {
    await userDataStore.auth({email: login.value, password: password.value}, 'signIn')
    if(!userDataStore.error) {
        router.push('/')
        userDataStore.fetchCart()

    }
}

</script>

<style lang="scss" scoped>


</style>