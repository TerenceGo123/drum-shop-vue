<template>
    <div>
        <div class="mb-5">
            <p>Вот что найдено по запросу:</p>
            <my-title>{{ route.query.q }}</my-title>
        </div>
        <list-items :items="sortedSearch()">
        </list-items>
    </div>
</template>

<script setup>
import ListItems from '@/components/ListItems.vue';
import MyTitle from '@/components/UI/MyTitle.vue';
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