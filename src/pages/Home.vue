<template>
  <div>
    <div v-if="drumStore.items.length == 0"> 
        Идёт загрузка...
    </div>
    <list-items :items="drumStore.items"></list-items>
  </div>
</template>

<script setup>
import ListItems from '@/components/ListItems.vue';
import { onMounted, computed } from 'vue';
import { useDrumDataStore } from '@/stores/DrumData'

const drumStore = useDrumDataStore();



// const sortedOfCategoryAndSearch = computed(() => {
//     if (drumStore.searchQuery === "") {
//         return sortedOfCategory.value
//     } else {
//         return sortedOfCategory.value.filter(item => item.title.toLowerCase().includes(drumStore.searchQuery.toLowerCase()));
//     }
// });

onMounted(async () => {
    drumStore.updateProductFlags()
})


</script>
