<template>
  <div class="navbar mb-8 ">
    <nav class=" ">
      <button
        class="button-category px-3 py-3 mr-3 rounded-lg last:mr-0 bg-orange-color transition-colors hover:bg-radial hover:from-orange-color  hover:to-orange-400/50  w-1/10"
        @click="router.push('/category')"
      >КАТАЛОГ
      </button>
      <!-- <button
        class="button-category px-3 py-3 mr-3 rounded-lg last:mr-0 bg-main-color hover:bg-black/15 transition-all w-1/10"
      >АКЦИИ
      </button>
      <button
        class="button-category px-3 py-3 mr-3 rounded-lg last:mr-0 bg-main-color hover:bg-black/15 transition-all w-1/10"
      >О НАС
      </button> -->
    </nav>
  </div>
</template>

<script setup>
import { useDrumDataStore } from "@/stores/DrumData";
import { useRouter } from "vue-router";

const drumStore = useDrumDataStore();
const router = useRouter();
let currentCategory


const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const changeCategory = (category, categoryId) => {
  if (category.target.classList.contains("active")) {
    drumStore.selectedCategory = "";
    category.target.classList.remove("active");
    router.push(`/`);
  } else {
    if(currentCategory) {
      currentCategory.target.classList.remove("active")
    }
    drumStore.selectedCategory = categoryId;
    category.target.classList.add("active");
    currentCategory = category
    router.push(`/category/${categoryId}`);
  }
};
</script>

<style>
.active {
  background-color: #ffbd4a;
}
</style>
