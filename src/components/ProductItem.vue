<template>
  <div class="item bg-main-color rounded-2xl py-5 cursor-pointer transition-all  hover:shadow-lg hover:shadow-orange-color/20 " @click="router.push(`/${item.id}`)">
      <div class="button-bag-container flex justify-end px-2.5 mb-2 ">
        <button class="button-bag transition-all">
          <img
            :src="item.isAdded ? activeIcon : defaultIcon"
            @click="addToCart(item)"
          />
        </button>
      </div>
      <div class="image-container h-3/5 flex justify-center items-center mb-5">
        <img :src="item.img" class="max-w-full max-h-full" alt="">
      </div>
      <div class="item-info px-3">
        <div class="title-container h-14">
          <h2 class="text-center">
            {{ item.title }}
          </h2>
        </div>
        <div class="oldPrice-container h-6">
          <h3 class="line-through text-stroke-color text-center">
            {{ item.oldPrice }}
          </h3>
        </div>
        <h2 class=" text-center text-2xl font-norms-b!" :class="{'text-orange-color' : item.oldPrice} ">
            ${{ item.price }}
        </h2>
      </div>
  </div>
</template>

<script setup>
import { useUserDataStore } from '@/stores/UserData';
import { useDrumDataStore } from '@/stores/DrumData'
import router from '@/router';

const userStore = useUserDataStore()
const drumStore = useDrumDataStore()


const props = defineProps({
  item: {
    type: Object,
    require: true
  }
})


const defaultIcon = "/ShoppingBag.svg"
const activeIcon = "/ShoppingBagActive.svg"


const addToCart = (item) => {
  const cart = [...userStore.userInfo.cart]; // Создаем копию массива
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id); // Сравниваем по id
  
  if (itemIndex !== -1) {
    // Удаляем товар из корзины
    cart.splice(itemIndex, 1);
    console.log("Товар удален из корзины");
  } else {
    // Добавляем товар в корзину
    cart.push({...item}); // Создаем копию объекта
    console.log("Товар добавлен в корзину");
  }
  
  // Обновляем корзину и состояние
  userStore.userInfo.cart = [...cart];
  item.isAdded = !item.isAdded;

  const userCarts = JSON.parse(localStorage.getItem('userCarts'))
  const currentUser = userCarts.findIndex(user => user.userId === userStore.userInfo.userId)
  userCarts[currentUser].cart = [...cart] 
  localStorage.setItem('userCarts', JSON.stringify(userCarts));
}
</script>