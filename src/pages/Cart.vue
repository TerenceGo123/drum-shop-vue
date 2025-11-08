<template>
    <div v-if="userStore.userInfo.cart.length !== 0" class="cart">
        <h1 class="text-3xl font-bold mb-8">Корзина</h1>
        <div class="flex justify-between gap-6">
            <list-cart-items 
                :items="userStore.userInfo.cart" 
                class=" w-3/5"
            ></list-cart-items>
            
            <div class="w-2/5">
                <h2 class="text-dark-gray-color text-2xl font-bold mb-6">ОПЛАТА</h2>
                <input 
                    type="text" 
                    class="w-full bg-gray-50 px-5 py-3 rounded-lg border-none text-base outline-none mb-6"
                    placeholder="ПРОМОКОД"
                >
                <div class="bg-gray-50 rounded-lg mb-6 p-5">
                    <p class="mb-5">{{ cartCount }} шт</p>
                    <div 
                        v-for="item in userStore.userInfo.cart" 
                        :key="item.id" 
                        class="flex justify-between mb-5"
                    >
                        <p>{{ item.title }} ({{ item.count }})</p>
                        <p>${{ (item.price * item.count).toFixed(2) }}</p>
                    </div>
                    <div class="flex justify-between mb-5">
                        <p>Доставка</p>
                        <p>$3</p>
                    </div>
                    <hr class="mb-5">
                    <div class="flex justify-between">
                        <h3 class="font-norms-b">СУММА</h3>
                        <p>${{ summ }}</p>
                    </div>
                </div>
                <my-button :ico="'/CreditCard.svg'">ОПЛАТИТЬ</my-button>
            </div>
        </div>
    </div>
    
    <div v-else class="w-full h-[50vh] flex flex-col justify-center items-center">
        <h1 class="text-dark-gray-color text-3xl mb-6">КОРЗИНА ПУСТА</h1>
        <img src="/ShoppingBagEmpty.svg" alt="" class="mb-6">
        <my-button @click="$router.push('/')">ПЕРЕЙТИ К ПОКУПКАМ</my-button>
    </div>
</template>

<script setup>
import ListCartItems from '@/components/ListCartItems.vue';
import { useUserDataStore } from '@/stores/UserData';
import { computed } from 'vue';
import MyButton from '@/components/UI/MyButton.vue';

const userStore = useUserDataStore();

const summ = computed(() => {
    let sum = 0;
    userStore.userInfo.cart.forEach((el) => {
        sum += el.count * el.price;
    });
    return (sum + 3).toFixed(2);
});

const cartCount = computed(() => {
    let count = 0;
    userStore.userInfo.cart.forEach((el) => {
        count += el.count;
    });
    return count;
});
</script>

<style lang="scss" scoped>
</style>