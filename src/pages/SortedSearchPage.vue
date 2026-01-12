<template>
    <div>
        <div class="mb-5">
            <h2 class="inline text-2xl">Вот что найдено по запросу: </h2>
            <h2 class="inline text-3xl font-norms-b! ">{{ route.query.q }}</h2>
        </div>
        <list-items :items="sortedSearch()">
        </list-items>
    </div>
</template>

<script setup>
import ListItems from '@/components/ListItems.vue';
import { useDrumDataStore } from '@/stores/DrumData';
import { useRoute } from 'vue-router';

const route = useRoute()
const drumStore = useDrumDataStore() 

const sortedSearch = () => {
    return drumStore.items.filter(item => item.title.toLowerCase().includes(route.query.q.toLowerCase()))
};



</script>

<style lang="scss" scoped>

</style>