<template>
  <div>
    <div class="max-w-3xl mb-12">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">All Articles</h1>
      <p class="text-gray-600">
        Browse our collection of Laravel tutorials, tips, and best practices
      </p>
    </div>

    <div class="mb-8">
      <div class="flex flex-wrap gap-3">
        <button
          @click="filterByCategory('All')"
          class="px-4 py-2 rounded-full text-sm transition-colors"
          :class="selectedCategory === 'All' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          @click="filterByCategory(category.id)"
          class="px-4 py-2 rounded-full text-sm transition-colors"
          :class="selectedCategory === category.id ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <router-link
        v-for="blog in posts"
        :key="blog.id"
        :to="`/blog/${blog.id}`"
        class="block"
      >
        <BlogCard :blog="blog" />
      </router-link>
    </div>

    <div v-if="posts.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">No articles found for the selected category.</p>
      <button
        @click="selectedCategory = 'All'"
        class="mt-4 text-red-500 hover:text-red-600 font-medium"
      >
        View all articles
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BlogCard from '../components/BlogCard.vue';
import useCategory from '../composables/category.js';
import usePost from '../composables/post';

const selectedCategory = ref('All');
// const categories = ['All', 'Basics', 'Advanced', 'APIs', 'Database', 'Testing'];

const { categories, getCategories } = useCategory();
const { posts, getPosts } = usePost();

onMounted(() => {
  getCategories();
  getPosts();
});

const allBlogs = [
  {
    id: 1,
    title: 'Getting Started with Laravel 10',
    excerpt: 'Learn how to set up your first Laravel project and understand the basic concepts.',
    image: 'https://picsum.photos/id/0/800/600',
    date: '2023-09-15',
    readTime: 5,
    category: 'Basics',
    author: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  },
  {
    id: 2,
    title: 'Building APIs with Laravel Sanctum',
    excerpt: 'A comprehensive guide to creating secure APIs using Laravel Sanctum authentication.',
    image: 'https://picsum.photos/id/1/800/600',
    date: '2023-09-10',
    readTime: 8,
    category: 'APIs',
    author: {
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  },
  {
    id: 3,
    title: 'Laravel Eloquent Relationships Explained',
    excerpt: 'Master the different types of Eloquent relationships and when to use them.',
    image: 'https://picsum.photos/id/2/800/600',
    date: '2023-09-05',
    readTime: 10,
    category: 'Database',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg'
    }
  },
  {
    id: 4,
    title: 'Testing Laravel Applications',
    excerpt: 'Learn how to write effective tests for your Laravel applications using PHPUnit.',
    image: 'https://picsum.photos/id/3/800/600',
    date: '2023-08-28',
    readTime: 12,
    category: 'Testing',
    author: {
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    }
  },
  {
    id: 5,
    title: 'Laravel Middleware Deep Dive',
    excerpt: 'Understand how middleware works in Laravel and how to create custom middleware.',
    image: 'https://picsum.photos/id/4/800/600',
    date: '2023-08-20',
    readTime: 7,
    category: 'Advanced',
    author: {
      name: 'Alex Turner',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
    }
  },
  {
    id: 6,
    title: 'Laravel Queues and Jobs',
    excerpt: 'Learn how to implement background processing in Laravel using queues and jobs.',
    image: 'https://picsum.photos/id/5/800/600',
    date: '2023-08-15',
    readTime: 9,
    category: 'Advanced',
    author: {
      name: 'Emily Clark',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  }
];

const filterByCategory = (category) => {
  selectedCategory.value = category;
  if (category != 'All') {
    getPosts(category);
  } else {
    getPosts('');
  }
};
</script>
