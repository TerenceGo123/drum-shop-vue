<template>
  <div>
    <div v-if="drumStore.items.length == 0"> 
        <img src="/loader.svg" alt="">
    </div>
    <div class="banner w-full h-[500px] flex justify-end items-center flex-col bg-[url('../public/BANNERS/EvansSetBanner.png')]  bg-center rounded-[20px] inset-shadow-bottom-black bg-cover  pb-5 mb-8 cursor-pointer transition-all duration-500 hover:scale-[101%]">
        <h3 class="uppercase font-norms-b! text-4xl mb-3 text-white">Evans Skin Drum Head Set</h3>
        <p class=" line-through text-2xl mb-3 text-stroke-color">$159.99</p>
        <p class="text-orange-color text-4xl font-norms-b!">$59.99</p>
    </div>
    <div>
      <h3>Катeгории</h3>
      <div class="w-full max-h-full grid gap-5 grid-cols-4 auto-rows-[300px] mb-5 max-lg:grid-cols-3 max-lg:gap-3 max-md:grid-cols-2 ">
        <div class="home-category row-span-2 ">
          <router-link to="/category/DRUM"><h4 class="home-category__title">БАРАБАННЫЕ<br>УСТАНОВКИ</h4></router-link>
        </div>
        <div class="home-category relative overflow-hidden">
          <router-link to="/category/DRUM"><h4 class="home-category__title">БАРАБАНЫ</h4></router-link>
        </div>
        <div class="home-category  col-span-2 ">
          <router-link to="/category/CYMBAL"><h4 class="home-category__title">ТАРЕЛКИ</h4></router-link>
        </div>
        <div class="home-category col-span-2 ">
          <router-link to="/category/STICK"><h4 class="home-category__title">ПАЛОЧКИ</h4></router-link>
        </div>
        <div class="home-category ">
          <router-link to="/category"><h4 class="home-category__title">ВСЕ КАТЕГОРИИ</h4></router-link>
        </div>
      </div>
    </div>
    <list-items :items="drumStore.items"></list-items>
  </div>
</template>

<script setup>
import ListItems from '@/components/ListItems.vue';
import { onMounted } from 'vue';
import { useDrumDataStore } from '@/stores/DrumData'

const drumStore = useDrumDataStore();





onMounted(async () => {
    if(drumStore.items.length == 0) {
      await drumStore.fetchDrumData()
    }
    drumStore.updateProductFlags()
})


</script>
