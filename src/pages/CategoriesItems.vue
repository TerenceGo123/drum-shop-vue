<template>
    <div>
        <list-items :items="sortedOfCategory" ></list-items>
    </div>
</template>

<script setup>
import { useDrumDataStore } from '@/stores/DrumData';
import { computed } from 'vue';
import ListItems from '@/components/ListItems.vue';
import { useRoute } from 'vue-router';

const router = useRoute() 
const drumStore = useDrumDataStore();

const currentCategory = router.params.name

const sortedOfCategory = computed(() => {
    // if (drumStore.selectedCategory === "") {
    //     return drumStore.items;
    // } else {
    //     return drumStore.items.filter(item => item.category === drumStore.selectedCategory);
    // }
    return drumStore.items.filter(item => item.category === currentCategory)
});
</script>

<style lang="scss" scoped>

</style>