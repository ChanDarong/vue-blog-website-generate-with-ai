<template>
  <div>
    <!-- Hero Section -->
    <section class="py-12 md:py-20 bg-gradient-to-r from-red-50 to-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mastering Laravel Development
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Tutorials, tips, and best practices for building modern web applications with Laravel
          </p>
          <router-link to="/blogs" class="inline-block bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Explore Articles
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Posts -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-8">Featured Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <router-link
            v-for="blog in featuredBlogs"
            :key="blog.id"
            :to="`/blog/${blog.id}`"
            class="block"
          >
            <BlogCard :blog="blog" />
          </router-link>
        </div>
        <div class="text-center mt-12">
          <router-link to="/blogs" class="inline-block text-red-500 hover:text-red-600 font-medium">
            View All Articles →
          </router-link>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-12 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h2>
          <p class="text-gray-600 mb-6">
            Subscribe to our newsletter to receive the latest Laravel tips and tutorials
          </p>
          <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email"
              class="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              class="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BlogCard from '../components/BlogCard.vue';

const email = ref('');

const featuredBlogs = [
  {
    id: 1,
    title: 'Getting Started with Laravel 10',
    excerpt: 'Learn how to set up your first Laravel project and understand the basic concepts.',
    image: 'https://picsum.photos/id/0/800/600',
    date: '2023-09-15',
    readTime: 5,
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
    author: {
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg'
    }
  }
];

const subscribeNewsletter = () => {
  alert(`Thank you for subscribing with ${email.value}!`);
  email.value = '';
};
</script>
