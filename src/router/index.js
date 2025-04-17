import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import AllBlogs from '../pages/AllBlogs.vue';
import About from '../pages/About.vue';
import BlogPost from '../pages/BlogPost.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/blogs',
    name: 'AllBlogs',
    component: AllBlogs,
    meta: {
      title: 'All Blogs'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About'
    }
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

// Navigation guards
router.beforeEach(async (to, from, next) => {
  // Set document title
  document.title = to.meta.title || import.meta.env.VITE_APP_NAME;

  // Set application header if function exists
  if (to.meta.title && typeof window.setAppHeader === 'function') {
    window.setAppHeader(to.meta.title);
  }

  next();
});

export default router;
