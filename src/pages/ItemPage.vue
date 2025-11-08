<template>
    <div>
        <h2>{{ currenItem.title }}</h2>
    </div>
</template>

<script setup>
import { useDrumDataStore } from '@/stores/DrumData';
import { useRoute } from 'vue-router';

const route = useRoute();
const drumStore = useDrumDataStore()


const currentid = route.params.id 
const currenItem = drumStore.items[currentid - 1]

</script>

<style lang="scss" scoped>

</style>