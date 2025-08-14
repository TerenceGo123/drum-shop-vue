<template>
  <div>
    <div class="item">
      <div class="button-bag-container">
        <button class="button-bag">
          <img
            :src="item.isAdded ? activeIcon : defaultIcon"
            @click="addToCart(item)"
          />
        </button>
      </div>
      <div class="img-container">
        <img :src="item.img" alt="" />
      </div>
      <div class="info-container">
        <p
          :class="{ item__title: true, 'item__title-discount': item.discount }"
        >
          {{ item.title }}
        </p>
        <h3 class="item__old-price" v-if="item.discount">
          {{ item.oldPrice }}
        </h3>
        <h2
          :class="{ item__price: true, 'item__price-discount': item.discount }"
        >
          ${{ item.price }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserDataStore } from '@/stores/UserData';
import { useDrumDataStore } from '@/stores/DrumData'

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

<style lang="scss" scoped>
.button-bag-container {
  display: flex;
  justify-content: end;
  padding: 0 20px 0 20px;
  width: 100%;
}

.button-bag {
  background: none;
  border: none;
  cursor: pointer;
}

.item {
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: $main-color;
  padding: 20px 0 20px 0;
  border-radius: 8px;
  transition: all 0.3s ease;
  &__title {
    font-size: 16px;
    line-height: 150%;
    color: $dark-color;
  }

  &__title-discount {
    font-size: 32px;
    line-height: 120%;
    color: $dark-gray-color;
    font-family: TTNormsPro-B;
  }

  &__price {
    font-family: TTNormsPro-B;
    color: $dark-gray-color;
  }

  &__price-discount {
    color: $orange-color;
    font-size: 32px;
  }

  &:hover {
    scale: 1.05;
  }

  &__old-price {
    font-size: 20px;
    text-decoration: line-through; // Зачеркиваем старую цену
    color: $dark-gray-color;
  }
}

.img-container {
  width: 80%;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
