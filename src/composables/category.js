import { ref } from 'vue';
import axios from "axios";

export default function useCategory() {
  const categories = ref([]);

  const fetchCategories = async () => {
    try {
      // Use relative URL that will be handled by the proxy
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
