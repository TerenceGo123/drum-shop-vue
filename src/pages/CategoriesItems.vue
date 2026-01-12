<template>
    <div>
        <list-items :items="drumStore.items.filter(item => item.category === currentCategory)" ></list-items>
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


</script>

<style lang="scss" scoped>

</style>