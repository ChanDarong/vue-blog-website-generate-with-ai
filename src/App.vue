<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main class="flex-grow">
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
  document.title = import.meta.env.VITE_APP_NAME;
});
</script>
