<template>
    <div>
        <div class="w-full max-h-full grid gap-5 grid-cols-4 auto-rows-[430px] mb-5 max-xl:gap-2 max-lg:grid-cols-3 max-md:auto-rows-[280px] max-sm:auto-rows-auto max-md:gap-1 max-sm:grid-cols-2">
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