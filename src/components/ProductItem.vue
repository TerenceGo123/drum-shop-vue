<template>
  <div class="item bg-main-color rounded-2xl py-5 cursor-pointer transition-all  hover:shadow-lg hover:shadow-orange-color/20 max-sm:py-3" @click="router.push(`/category/${item.category}/${item.id}`)">
      <div class="button-bag-container flex justify-end px-2.5 mb-2 max-md:mb-1 max-sm:px-1 ">
        <button class="button-bag transition-all ">
          <img
            :src="item.isAdded ? activeIcon : defaultIcon"
            @click.stop="addToCart(item)"
            class="max-sm:w-4/5"
          />
        </button>
      </div>
      <div class="image-container h-3/5 flex justify-center items-center mb-5 max-md:h-1/2 max-sm:mb-2">
        <img :src="item.img" class="max-w-full max-h-full" alt="">
      </div>
      <div class="item-info px-3">
        <div class="title-container">
          <h2 class="text-center truncate max-md:text-sm"  >
            {{ item.title }}
          </h2>
        </div>
        <div class="text-center mb-2 max-md:mb-1">
          <div class="rating-mini">
              <span class="star-active"></span>	
              <span class="star-active"></span>    
              <span class="star-active"></span>  
              <span class="star-active"></span>    
              <span class="star-active"></span>
          </div>
        </div>
        <div class="oldPrice-container">
          <h3 class="line-through text-stroke-color text-center max-md:text-sm">
            {{ item.oldPrice }}
          </h3>
        </div>
        <h2 class=" text-center text-2xl font-norms-b! max-md:text-xl" :class="{'text-orange-color' : item.oldPrice} ">
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


const defaultIcon = "/ICONS/ShoppingBag.svg"
const activeIcon = "/ICONS/ShoppingBagActive.svg"


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

<style>
.rating-mini {
	display: inline-block;
	font-size: 0;
}
.rating-mini span {
	padding: 0;
	font-size: 16px;
	line-height: 1;
	color: var(--color-main-color);
}
.rating-mini > span:before {
	content: '★';
}
.rating-mini > span.star-active {
	color: var(--color-orange-color);
}

</style>