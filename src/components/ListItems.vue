<template>
    <div>
        <div class="w-full max-h-full grid gap-5 grid-cols-4 auto-rows-[430px]">
            <product-item v-for="item in items" :key="item.id" :item="item" />
        </div>
    </div>
</template>

<script>
import ProductItem from './ProductItem.vue';
    export default {
        props: {
            items: Array,
            require: true
        },
        components: {
            ProductItem
        }   
}

</script>

<style lang="scss" scoped>


</style>