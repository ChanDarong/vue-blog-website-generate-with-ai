import { ref } from 'vue';
import axios from 'axios';

export default function usePost() {
  const post = ref();
  const posts = ref([]);

  const getPosts = async (category = '', isFeatured = 0) => {
    try {
      const response = await axios.get('/api/posts', {
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

  const getPostBySlug = async (slug) => {
    try {
      const response = await axios.get(`/api/posts/slug/${slug}`);
      post.value = response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }

  return {
    post,
    posts,
    getPosts,
    getPostBySlug
  }
}
