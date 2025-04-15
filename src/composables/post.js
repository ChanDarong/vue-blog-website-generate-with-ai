import { ref } from 'vue';
import axios from 'axios';

export default function usePost() {
  const posts = ref([]);

  const getPosts = async (category = '', isFeatured = 0) => {
    try {
      const response = await axios.get('/api/api/v1/posts', {
        params: {
          withCategory: true,
          withAuthor: true,
          category: category,
          isFeatured: isFeatured
        }
      });
      posts.value = response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  return {
    posts,
    getPosts
  }
}
