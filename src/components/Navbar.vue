<template>
  <div class="navbar">
    <nav>
      <button
        v-for="category in categories"
        :key="category.id"
        :class="{
          'button-category': true,
          active: drumStore.selectedCategory === category.id,
        }"
        @click="(event) => changeCategory(event, category.id)"
      >
        {{ category.title }}
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useDrumDataStore } from '@/stores/DrumData'
import {ref, computed} from 'vue'
const drumStore = useDrumDataStore()

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const changeCategory = (category, categoryId) => {
  if (category.target.classList.contains("active")) {
    drumStore.selectedCategory = "";
  } else {
    drumStore.selectedCategory = categoryId
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  margin-bottom: 32px;
}

.active {
  background: $orange-color !important;
}

.button-category {
  background: $main-color;
  padding: 12px 20px;
  border: none;
  margin-right: 12px;
  border-radius: 8px;
}

.button-category:last-child {
  margin-right: 0px;
}
</style>
