<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1">
    <img :src="blog.image" :alt="blog.title" class="w-full h-48 object-cover" />
    <div class="p-5">
      <div class="flex items-center text-sm text-gray-500 mb-2">
        <span>{{ formatDate(blog.date) }}</span>
        <span class="mx-2">•</span>
        <span>{{ blog.readTime }} min read</span>
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ blog.title }}</h3>
      <p class="text-gray-600 mb-4">{{ blog.excerpt }}</p>
      <div class="flex items-center">
        <img :src="blog.author.avatar" :alt="blog.author.name" class="w-8 h-8 rounded-full mr-3" />
        <span class="text-sm text-gray-700">{{ blog.author.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>
