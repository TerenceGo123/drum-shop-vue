<template>
    <div>
        <div class="item-cart" style="margin-bottom: 20px;" >
            <div class="item-cart-content">
                <div class="item-cart-image-container">
                    <img class="item-cart__img" :src=item.img alt="item-cart-image">
                </div>
                <div class="item-cart-info">
                    <h2 class="item-cart__title">{{item.title}}</h2>
                    <div class="item-cart-color-dileviry-container">
                        <div class="item-cart-color-container">
                            <p class="item-cart__color" >ЦВЕТ:</p>
                            <span class="item-cart__color-sircle" ></span>
                        </div>
                        <div class="item-cart-delivery">
                            <img src="@/assets/DeliveryIco.svg" alt="deliveryIco" class="item-cart-delivery__ico">
                            <p class="item-cart-delivery__info">Доставка за 3 дня</p>
                        </div>
                    </div>
                    <h3 class="item-cart__price" >${{item.price}}</h3>
                </div>
            </div>
            <div class="item-cart-action">
                <button class="item-cart-action__close-button" @click="removeItem(item)"><img src="@/assets/CloseIco.svg" alt=""></button>
                <div class="item-cart-action-counter">
                    <button class="item-cart-action__minus-button" @click="minusItem(item)" style="margin-right: 8px;" ><img src="" alt=""><img src="../assets/minusIco.svg" alt=""></button>
                    <p style="margin-right: 8px;" >{{ count }}</p>
                    <button class="item-cart-action__minus-button" @click="plusItem"><img src="../assets/plusIco.svg" alt=""></button>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { useUserDataStore } from '@/stores/UserData';
const userStore = useUserDataStore() 

// const {removeFromCart} = userStore 

const props = defineProps({
    item: {
        type: Object,
        require: true
    }
})


const count = ref(1) 

const removeItem = (it) => {
    userStore.userInfo.cart = userStore.userInfo.cart.filter(item => item != it)
} 

const minusItem = (it) => {
    count.value--
    if (count.value === 0) {
        removeItem(it)
    }
} 

const plusItem = () => {
    count.value++
} 



</script>

<style lang="scss" scoped>
.item-cart {
    display: flex;
    justify-content: space-between;

    &-content {
        display: flex;
        width: 100%;
    }

    &-info {
        width: 60%
    }

    &-image-container {
        width: 150px;
        background: $main-color;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
    }

    &__img{
        width: 80%;
    }


    &__title {
        // font-size: 20px;
        margin-bottom: 8px;
    }


    &-color-dileviry-container {
        display: flex;
        justify-content: space-between;
        width: 60%;
        margin-bottom: 20px;
    }

    &-color-container {
        display: flex;
        align-items: center;
    }

    &__color {
        display: inline;
        margin-right: 8px;
        &-sircle {
            display: block;
            width: 16px;
            height: 16px;
            background: #000;
            border-radius: 50%;
        }
    }

    &-delivery{
       display: flex;
       
       &__ico {
            margin-right: 8px;
       }

       &__info {
            color: $dark-gray-color;
       }
    }


    &__price {
        font-family: TTNormsPro-B;
        font-size: 20px;
    }


    &-action {
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: space-between;
        width: 30%;

        &-counter {
            display: flex;
        }
    }
}

hr {
    border-color: rgba($stroke-color, 0.3) ;
    margin-bottom: 20px; 

    :last-of-type {
        margin-bottom: 0px; 
        opacity: 0;

    }
}

</style>