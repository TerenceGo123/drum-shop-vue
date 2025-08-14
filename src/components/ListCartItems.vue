<template>
    <div class="cart-container">
        <cart-product-item v-for="item in items" :key="item.id" :item="item"></cart-product-item>
    </div>
</template>

<script setup>
import CartProductItem from './CartProductItem.vue';

const props = defineProps({
  items: {
    type: Object,
    require: true
  }
})

</script>

<style lang="scss" scoped>






</style>