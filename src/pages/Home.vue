<template>
  <div>
    <!-- Hero Section -->
    <section class="py-12 md:py-20 bg-gradient-to-r from-green-200 to-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mastering <span class="text-green-700">Laravel</span> Development
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Tutorials, tips, and best practices for building modern web applications with Laravel
          </p>
          <router-link to="/blogs">
            <div class="relative inline-block group focus:outline-none focus:ring cursor-pointer">
              <span class="absolute inset-0 transition-transform translate-x-0 translate-y-0 group-hover:translate-y-1.5 group-hover:translate-x-1.5 bg-green-700">
              </span>
              <span class="relative inline-block px-4 py-3 text-sm font-bold tracking-widest uppercase border-2 border-black text-white">
                Explore Articles
              </span>
            </div>
          </router-link>

        </div>
      </div>
    </section>

    <!-- Featured Posts -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-8">Featured Articles</h2>

        <!-- Loading Spinner -->
        <div v-if="loading" class="py-16">
          <Spinner/>
          <p class="text-center text-gray-500 mt-4">Loading featured articles...</p>
        </div>

        <!-- Content -->
        <template v-else>
          <div v-if="posts.length === 0" class="text-center py-12">
            <p class="text-gray-500">No featured articles found."</p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <router-link
              v-for="blog in posts"
              :key="blog.id"
              :to="`/blog/${blog.slug}`"
              class="block"
            >
              <BlogCard :blog="blog" />
            </router-link>
          </div>
        </template>
        <div class="text-center mt-12">
          <router-link to="/blogs" class="inline-block text-green-700 hover:text-green-700 font-medium">
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
              class="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              required
            />
            <button
              type="submit"
              class="bg-green-700 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
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
import Spinner from '@/components/Spinner.vue';
import usePost from '@/composables/post';

const email = ref('');
const loading = ref(true);
const { posts, getPosts } = usePost();

onMounted(async () => {
  try {
    await getPosts('', 1);
  } finally {
    loading.value = false;
  }
});

const subscribeNewsletter = () => {
  alert(`Thank you for subscribing with ${email.value}!`);
  email.value = '';
};
</script>
