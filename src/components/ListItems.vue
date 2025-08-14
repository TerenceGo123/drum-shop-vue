<template>
    <div>
        <div class="ListItem">
            <product-item v-for="item in items" :key="item.id" :item="item"  :class="{'item--discount': item.discount, 'double': item.double}"></product-item>
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
.ListItem {
  display: grid;
//   grid-template-columns: repeat(4, 1fr);
  //grid-auto-rows: 350px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px 40px;   
}

.item--discount {
    grid-column: span 2;
    grid-row: span 2;
}


.double{
   grid-column: span 2; 
}

.block {
    width: 100px;
    height: 100px;
    background: #000;
}

</style>