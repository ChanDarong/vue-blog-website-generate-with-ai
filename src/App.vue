<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

onMounted(() => {
  document.title = 'Laravel Dev Blog';
});
</script>