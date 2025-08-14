<template>
    <div v-if="userStore.userInfo.cart.length != 0" class="cart">
        <h1>Корзина</h1>
        <div class="cart-content">
            <list-cart-items :items="userStore.userInfo.cart"  class="list-cart-items"></list-cart-items>
            <div class="cart-pay">
                <h2 class="cart-pay__title" >ОПЛАТА</h2>
                <input type="text" class="input" placeholder="ПРОМОКОД">
                <div class="cart-pay-info">
                    <p class="cart-pay-info__count">{{ userStore.userInfo.cart.length }} шт</p>
                    <div class="cart-pay-info__item" v-for="item in userStore.userInfo.cart" :key="item.id" >
                        <p>{{ item.title }}</p>
                        <p>${{ item.price }}</p>
                    </div>
                    <div class="cart-pay-info__dilivery">
                        <p>Доставка</p>
                        <p>$3</p>
                    </div>
                    <hr style="margin-bottom: 20px;">
                    <div class="cart-pay-info__summ">
                        <h3>СУММА</h3>
                        <p>${{ summ() }}</p>
                    </div>
                </div>
                 <my-button :ico="'/CreditCard.svg'">ОПЛАТИТЬ</my-button>
            </div>
        </div>
    </div>
    <div v-else class="cart-empty">
        <h1 class="cart-empty__title" >КОРЗИНА ПУСТА</h1>
        <img src="/ShoppingBagEmpty.svg" alt=""  class="cart-empty__img">
        <my-button @click="$router.push('/')" >ПЕРЕЙТИ К ПОКУПКАМ</my-button>
    </div>
</template>

<script setup>
import ListCartItems from '@/components/ListCartItems.vue';
import { useUserDataStore } from '@/stores/UserData';
import MyButton from '@/components/UI/MyButton.vue';


const userStore = useUserDataStore() 

const summ = () => {
    let sum = 0 
    for(let i = 0; i < userStore.userInfo.cart.length; i++) {
        sum += userStore.userInfo.cart[i].price
    }
    return (sum + 3).toFixed(2)
} 

</script>

<style lang="scss" scoped>
.cart{

    &-content {
    display: flex;
    justify-content: space-between;
    }
    
    &-pay {
        width: 38%;

        &__title {
            color: $dark-gray-color;
            font-size: 2.4rem;
            font-family: TTNormsPro-B
        }

        &-info {
            background: $main-color;
            border-radius: 8px;
            margin-bottom: 24px;
            padding: 20px;

            &__count {
                margin-bottom: 20px;
            }

            &__item {
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
            }

            &__dilivery {
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
            }

            &__summ {
                display: flex;
                justify-content: space-between;
            }
        }
    }


    &-empty {
        width: 100%;
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        &__title {
            color: $dark-gray-color;
            margin-bottom: 24px;
        }

        &__img {
            margin-bottom: 24px;
        }
    }
}


.list-cart-items {
    width: 60%;
    border: solid 1px $main-color;
    border-radius: 8px;
    padding: 12px;
}


.input {
  padding: 12px 20px;
  width: 100%;
  border: none;
  background: $main-color;
  border-radius: 8px;
  font-size: 16px;
  line-height: 150%;
  outline: none;
  margin-bottom: 24px;
}
</style>