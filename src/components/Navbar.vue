<template>
  <div class="navbar mb-8 ">
    <div class="w-1/7">
      <MyButton :ico="'/ICONS/Bar.svg'">КАТАЛОГ</MyButton>
    </div>
  </div>
</template>

<script setup>
import { useDrumDataStore } from "@/stores/DrumData";
import { useRouter } from "vue-router";
import MyButton from "./UI/MyButton.vue";

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
