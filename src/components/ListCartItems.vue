<template>
    <div>
        <cart-product-item v-for="item in items" :key="item.id" :item="item"></cart-product-item>
    </div>
</template>

<script setup>
import CartProductItem from './CartProductItem.vue';

const props = defineProps({
  items: {
    type: Array,
    require: true
  }
})


</script>

<style lang="scss" scoped>

</style>