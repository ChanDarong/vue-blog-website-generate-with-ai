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
            v-for="blog in posts"
            :key="blog.id"
            :to="`/blog/${blog.slug}`"
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
import { onMounted, ref } from 'vue';
import BlogCard from '../components/BlogCard.vue';
import usePost from '@/composables/post';

const email = ref('');
const { posts, getPosts } = usePost();

onMounted(() => {
  getPosts('', 1);
});

const subscribeNewsletter = () => {
  alert(`Thank you for subscribing with ${email.value}!`);
  email.value = '';
};
</script>
