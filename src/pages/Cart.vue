<template>
    <div v-if="userStore.userInfo.cart.length !== 0" class="cart mb-5">
        <my-title>Корзина</my-title>
        <div class="flex justify-between gap-6">
            <list-cart-items 
                :items="userStore.userInfo.cart" 
                class=" w-3/5"
            ></list-cart-items>
            
            <div class="w-2/5">
                <h2 class="text-dark-gray-color text-2xl font-bold mb-6">ОПЛАТА</h2>
                <input 
                    type="text" 
                    v-model="promo"
                    class="w-full bg-gray-50 px-5 py-3 rounded-lg border-none text-base outline-none mb-6"
                    placeholder="ПРОМОКОД"
                >
                <div class="bg-gray-50 rounded-lg mb-6 p-5">
                    <p class="mb-5">{{ totalCount }} шт</p>
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
                <my-button :ico="'/ICONS/CreditCard.svg'">ОПЛАТИТЬ</my-button>
            </div>
        </div>
    </div>
    
    <div v-else class="w-full flex flex-col justify-center items-center">
        <h1 class="text-dark-gray-color text-3xl mb-6">КОРЗИНА ПУСТА</h1>
        <img src="/ShoppingBagEmpty.svg" alt="" class="mb-6">
        <my-button @click="$router.push('/')" class="mb-6">ПЕРЕЙТИ К ПОКУПКАМ</my-button>
    </div>
</template>

<script setup>
import ListCartItems from '@/components/ListCartItems.vue';
import { useUserDataStore } from '@/stores/UserData';
import { computed } from 'vue';
import MyButton from '@/components/UI/MyButton.vue';
import MyTitle from '@/components/UI/MyTitle.vue';

const userStore = useUserDataStore();
const promo = ref()

const summ = computed(() => {
    const total = userStore.userInfo.cart.reduce((sum, item) => 
        sum + (item.count * item.price), 0
    );
    return (total + 3).toFixed(2)
});

const totalCount = computed(() => {
    return userStore.userInfo.cart.reduce((total, item) => total + item.count, 0)
});

</script>

<style lang="scss" scoped>
</style>