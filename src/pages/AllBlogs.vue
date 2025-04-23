<template>
  <article class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mb-12">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ selectedCategory.name }}</h1>
      <p class="text-gray-600">
        {{ selectedCategory.description }}
      </p>
    </div>

    <div class="mb-8">
      <div class="flex flex-wrap gap-3">
        <button
          @click="filterByCategory('All')"
          class="px-4 py-2 rounded-full text-sm transition-colors cursor-pointer"
          :class="selectedCategoryId === 'All' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          @click="filterByCategory(category.id)"
          class="px-4 py-2 rounded-full text-sm transition-colors cursor-pointer"
          :class="selectedCategoryId === category.id ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="py-16">
      <Spinner/>
      <p class="text-center text-gray-500 mt-4">Loading articles...</p>
    </div>
    <template v-else>
      <div v-if="posts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">No articles found for the selected category.</p>
        <button
          @click="selectedCategoryId = 'All'"
          class="mt-4 text-green-700 hover:text-green-700 font-medium"
        >
          View all articles
        </button>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <router-link
          v-for="blog in posts"
          :key="blog.slug"
          :to="`/blog/${blog.slug}`"
          class="block"
        >
          <BlogCard :blog="blog" />
        </router-link>
      </div>
    </template>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BlogCard from '../components/BlogCard.vue';
import Spinner from '@/components/Spinner.vue';
import useCategory from '../composables/category.js';
import usePost from '../composables/post';

const selectedCategoryId = ref('All');
const loading = ref(true);
const { category, categories, getCategory, getCategories } = useCategory();
const { posts, getPosts } = usePost();

// Create a computed property to handle the displayed category
const selectedCategory = computed(() => {
  if (selectedCategoryId.value === 'All') {
    return {
      name: 'All Articles',
      description: 'Browse our collection of Laravel tutorials, tips, and best practices'
    };
  }
  return category.value || { name: 'Loading...', description: '' };
});

onMounted(async () => {
  try {
    await getCategories();
    await getPosts();
  } finally {
    loading.value = false;
  }
});

const filterByCategory = async (category_id) => {
  selectedCategoryId.value = category_id;
  try {
    loading.value = true;
    if (category_id != 'All') {
      await getCategory(category_id);
      await getPosts(category_id);
    } else {
      await getPosts('');
    }
  } finally {
    loading.value = false;
  }
};
</script>
