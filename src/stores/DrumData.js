import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
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
  
  const fetchDrumData = async (maxAttempts = 10, delay = 1000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await axios.get(url);

      items.value = response.data.items
      updateProductFlags()
      categories.value = response.data.categories;
      console.log("Данные успешно загружены");
      return; // Успех - выходим из функции
    } catch (err) {
      console.error(`Попытка ${attempt}/${maxAttempts} не удалась:`, err.message);
      
      if (attempt === maxAttempts) {
        console.error("Все попытки исчерпаны");
        return;
      }
      
      // Ждем перед следующей попыткой
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const updateProductFlags = () => {
  items.value = items.value.map(item => ({
    ...item,
    isAdded: userStore.isProductInCart(item.id)
  }))
}




  return {
    items, categories, contact, selectedCategory, searchQuery, fetchDrumData, updateProductFlags
  }
});
