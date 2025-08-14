<template>
    <div class="login" @submit.prevent="handleSubmit">
        <div class="content">
            <form class="login-form">
                <p class="error-mesage" v-if="userDataStore.error" >{{ userDataStore.error }}</p>
                <h1 class="login-title">РЕГИСТРАЦИЯ</h1>
                <input type="text" placeholder="Имя" v-model="name" class="login-input">
                <input type="text" placeholder="Фамилия" v-model="surname" class="login-input">
                <input type="text" placeholder="Почта" v-model="login" class="login-input">
                <input type="password" placeholder="Пароль" v-model="password" class="login-input">
                <!-- <div class="remember-me">
                    <input type="checkbox" id="remember-me" class="remember-me-checkbox">
                    <label for="remember-me" class="remember-me-label">Запомнить Меня</label>
                </div> -->
                <div v-if="userDataStore.loader" style="text-align: center;">
                    <span  class="loader"></span>
                </div>
                <my-button v-else @click="singUp" :type="'submit'" >ЗАРЕГИСТРИРОВАТЬСЯ</my-button>
                <div class="auth-prompt">
                    <p class="auth-prompt__text">Есть аккаунт?</p>
                    <router-link class="auth-prompt__link" to="/sign" >Войти</router-link>
                </div>
            </form>
        </div>
        
        <div class="login-image-container">
            <img src="/RegisterImage.png" alt="Изображение для входа" class="login-image">
        </div>
    </div> 
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import { useUserDataStore } from '@/stores/UserData';
import MyButton from '@/components/UI/MyButton.vue';

const userDataStore = useUserDataStore() 
const router = useRouter() 
const name = ref('')
const surname = ref('')
const login = ref('')
const password = ref('') 


const singUp = async () => {
    await userDataStore.auth({email: login.value, password: password.value}, 'signUp')
    if(!userDataStore.error) {
        router.push('/')
        userDataStore.userInfo.name = name.value
        userDataStore.userInfo.surname = surname.value
        userDataStore.fetchCart()
    }
}

</script>

<style lang="scss" scoped>
@import '/src/assets/styles/authStyle.scss'

</style>