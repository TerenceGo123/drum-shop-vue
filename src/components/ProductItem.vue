<template>
  <div class="item bg-main-color rounded-2xl py-5 cursor-pointer transition-all  hover:shadow-lg hover:shadow-orange-color/20 ">
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
          <h2 class="text-center hover:text-orange-color" @click="router.push(`/category/${item.category}/${item.id}`)" >
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
  const itemIndex = userStore.userInfo.cart.findIndex(cartItem => cartItem.id === item.id);
  
  if (itemIndex !== -1) {
    userStore.userInfo.cart.splice(itemIndex, 1);
    console.log("Товар удален из корзины");
  } else {
    userStore.userInfo.cart.push({...item});
    console.log("Товар добавлен в корзину");
  }
  
  item.isAdded = !item.isAdded;

  // Обновляем localStorage
  const userCarts = JSON.parse(localStorage.getItem('userCarts'))
  const currentUser = userCarts.findIndex(user => user.userId === userStore.userInfo.userId)
  userCarts[currentUser].cart = userStore.userInfo.cart;
  localStorage.setItem('userCarts', JSON.stringify(userCarts));
}
</script>