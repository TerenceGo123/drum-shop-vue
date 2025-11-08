<template>
  <div class="navbar mb-8">
    <nav>
      <button
        v-for="category in categories"
        :key="category.id"
        class="button-category px-3 py-5 mr-3 rounded-lg last:mr-0 bg-main-color hover:bg-black/15 transition-all"
        @click="(event) => changeCategory(event, category.id)"
      >
        {{ category.title }}
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useDrumDataStore } from "@/stores/DrumData";
import { useRoute } from "vue-router";

const drumStore = useDrumDataStore();
const router = useRoute();

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
  } else {
    drumStore.selectedCategory = categoryId;
    category.target.classList.add("active");
    router.push(`/category/${categoryId}`);
  }
};
</script>

<style>
.active {
  background-color: #ffbd4a;
}
</style>
