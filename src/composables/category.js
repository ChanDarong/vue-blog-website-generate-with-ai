import { ref } from 'vue';
import axios from "axios";

export default function useCategory() {
  const categories = ref([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/api/v1/categories');
      categories.value = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  return {
    categories,
    fetchCategories
  }
}
