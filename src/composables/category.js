import { ref } from 'vue';
import axios from "axios";

export default function useCategory() {
  const category = ref();
  const categories = ref([]);

  const getCategory = async (id) => {
    try {
      const response = await axios.get(`/api/categories/${id}`);
      category.value = response.data;
    } catch (error) {
      console.error('Error fetching a category:', error);
    }
  }

  const getCategories = async () => {
    try {
      // Use relative URL that will be handled by the proxy
      const response = await axios.get('/api/categories');
      categories.value = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  return {
    category,
    categories,
    getCategory,
    getCategories
  }
}
