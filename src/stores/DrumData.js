import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserDataStore } from "./UserData";

// const url = "https://api.npoint.io/82881f4b8b9b8c862f59";
const url = "https://my-drum-store-default-rtdb.europe-west1.firebasedatabase.app/data.json";



export const useDrumDataStore = defineStore("drumData", () => {
  const items = ref([]);
  const categories = ref([]);
  const contact = ref([]);
  const selectedCategory = ref('') 
  const searchQuery = ref('') 

  const userStore = useUserDataStore() 

  const fetchDrumData = async () => {
    try {
      const response = await axios.get(url);
      const serverItems = response.data.items;

      // Обновляем isAdded на основе корзины пользователя
      items.value = serverItems.map(item => ({
        ...item,
        isAdded: userStore.isProductInCart(item.id) // Проверяем, есть ли товар в корзине
      }));

      categories.value = response.data.categories;
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
    }
  };

  return {
    items, categories, contact, fetchDrumData, selectedCategory, searchQuery
  }
});
