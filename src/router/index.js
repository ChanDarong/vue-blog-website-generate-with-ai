import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import AllBlogs from '../pages/AllBlogs.vue';
import About from '../pages/About.vue';
import BlogPost from '../pages/BlogPost.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blogs',
    name: 'AllBlogs',
    component: AllBlogs
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: BlogPost
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
