<template>
  <div>
    <h3 v-if="sortedOfCategoryAndSearch.length == 0">Идёт загрузка ...</h3>
    <list-items :items="sortedOfCategoryAndSearch"></list-items>
  </div>
</template>

<script setup>
import ListItems from '@/components/ListItems.vue';
import { onMounted, computed } from 'vue';
import { useDrumDataStore } from '@/stores/DrumData'

const drumStore = useDrumDataStore();

const sortedOfCategory = computed(() => {
    if (drumStore.selectedCategory === "") {
        return drumStore.items;
    } else {
        return drumStore.items.filter(item => item.category === drumStore.selectedCategory);
    }
});

const sortedOfCategoryAndSearch = computed(() => {
    if (drumStore.searchQuery === "") {
        return sortedOfCategory.value
    } else {
        return sortedOfCategory.value.filter(item => item.title.toLowerCase().includes(drumStore.searchQuery.toLowerCase()));
    }
});

// onMounted(async () => {
//     await drumStore.fetchDrumData();
//     console.log("СРАБОТАЛО");
// });
</script>

<style lang="scss">
/* Ваши стили */
</style>
