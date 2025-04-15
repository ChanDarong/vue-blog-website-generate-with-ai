<template>
  <div v-if="post">
    <div class="max-w-3xl mx-auto">
      <!-- Blog Header -->
      <div class="mb-8">
        <div class="flex items-center text-sm text-gray-500 mb-4">
          <router-link to="/blogs" class="hover:text-red-500">← Back to all articles</router-link>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ post.title }}</h1>
        <div class="flex items-center">
          <img :src="post.author.avatarUrl" :alt="post.author.name" class="w-10 h-10 rounded-full mr-3" />
          <div>
            <div class="text-gray-800 font-medium">{{ post.author.name }}</div>
            <div class="text-sm text-gray-500">
              {{ formatDate(post.createdAt) }} • {{ post.readTime }} min read
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Image -->
      <div class="mb-8">
        <img :src="post.imageUrl" :alt="post.title" class="w-full h-auto rounded-lg" />
      </div>

      <!-- Blog Content -->
      <div class="prose prose-red max-w-none" v-html="parsedContent"></div>

      <!-- Tags -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <div class="flex flex-wrap gap-2">
          <template v-for="tag in post.tags">
            <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{{ tag }}</span>
          </template>
        </div>
      </div>

      <!-- Related Posts -->
      <div class="mt-12">
        <h3 class="text-xl font-bold text-gray-800 mb-6">Related Articles</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <router-link
            v-for="relatedBlog in relatedBlogs"
            :key="relatedBlog.slug"
            :to="`/blog/${relatedBlog.slug}`"
            class="block"
          >
            <BlogCard :blog="relatedBlog" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-gray-500 text-lg">Loading article...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import BlogCard from '../components/BlogCard.vue';
import usePost from '@/composables/post';

const route = useRoute();
const blog = ref(null);
const { posts, post, getPostBySlug, getPosts } = usePost();

// Function to load post data and related posts
async function loadPostData() {
  await getPostBySlug(route.params.slug);
  if (post.value?.category) {
    await getPosts(post.value.category.id);
  }
}

// Load post data initially
onMounted(async () => {
  await loadPostData();
});

// Watch for route changes to reload data when navigating between blog posts
watch(
  () => route.params.slug,
  async (newSlug) => {
    if (newSlug) {
      await loadPostData();
    }
  }
);

const parsedContent = computed(() => {
  if (!post.value || !post.value.content) return '';

  // Parse markdown to HTML
  return marked(post.value.content);
});

const relatedBlogs = computed(() => {
  if (!post.value || !posts.value) return [];
  console.log(posts.value);
  return posts.value.filter(p => p.id !== post.value.id);
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>
