<template>
  <div v-if="blog">
    <div class="max-w-3xl mx-auto">
      <!-- Blog Header -->
      <div class="mb-8">
        <div class="flex items-center text-sm text-gray-500 mb-4">
          <router-link to="/blogs" class="hover:text-green-700">← Back to all articles</router-link>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-black mb-4">{{ blog.title }}</h1>
        <div class="flex items-center">
          <img :src="blog.author.avatar" :alt="blog.author.name" class="w-10 h-10 rounded-full mr-3" />
          <div>
            <div class="text-black font-medium">{{ blog.author.name }}</div>
            <div class="text-sm text-gray-500">
              {{ formatDate(blog.date) }} • {{ blog.readTime }} min read
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Image -->
      <div class="mb-8">
        <img :src="blog.image" :alt="blog.title" class="w-full h-auto rounded-lg" />
      </div>

      <!-- Blog Content -->
      <div class="prose prose-red max-w-none">
        <p>
          Laravel is a web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things.
        </p>

        <h2>Getting Started</h2>
        <p>
          Laravel has the most extensive and thorough documentation and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.
        </p>

        <p>
          You may also try the Laravel Bootcamp, where you will be guided through building a modern Laravel application from scratch.
        </p>

        <h2>Laravel Ecosystem</h2>
        <p>
          Laravel's robust library of first-party tools and libraries, such as Forge, Vapor, Nova, and Envoyer help you take your projects to the next level. Pair them with powerful open source libraries like Cashier, Dusk, Echo, Horizon, Sanctum, Telescope, and more.
        </p>

        <pre><code>// Example Laravel Route
Route::get('/posts', function () {
    return Post::all();
});</code></pre>

        <h2>Key Features</h2>
        <ul>
          <li>Simple, fast routing engine</li>
          <li>Powerful dependency injection container</li>
          <li>Multiple back-ends for session and cache storage</li>
          <li>Expressive, intuitive database ORM</li>
          <li>Database agnostic schema migrations</li>
          <li>Robust background job processing</li>
          <li>Real-time event broadcasting</li>
        </ul>

        <blockquote>
          <p>Laravel is a framework that just works. It's been thoughtfully crafted to help you create amazing applications.</p>
        </blockquote>

        <p>
          Whether you're new to PHP web frameworks or have years of experience, Laravel is a framework that can grow with you. We'll help you take your first steps as a web developer or give you a boost as you take your expertise to the next level.
        </p>
      </div>

      <!-- Tags -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Laravel</span>
          <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">PHP</span>
          <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Web Development</span>
        </div>
      </div>

      <!-- Related Posts -->
      <div class="mt-12">
        <h3 class="text-xl font-bold text-black mb-6">Related Articles</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <router-link
            v-for="relatedBlog in relatedBlogs"
            :key="relatedBlog.id"
            :to="`/blog/${relatedBlog.id}`"
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
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import BlogCard from '../components/BlogCard.vue';

const route = useRoute();
const blog = ref(null);

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

onMounted(() => {
  const blogId = parseInt(route.params.id);
  blog.value = allBlogs.find(b => b.id === blogId);
});

const relatedBlogs = computed(() => {
  if (!blog.value) return [];
  return allBlogs
    .filter(b => b.id !== blog.value.id && b.category === blog.value.category)
    .slice(0, 2);
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>
