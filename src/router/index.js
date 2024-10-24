import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'register',
      component: () => import('../views/Registration.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }, 
    {
      path:'/',
      name:'messenger',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path:'/:id',
      name:'conversation-details',
      meta: { requiresAuth: true },
      component: () => import('../views/Dashboard.vue'),
    }
  ]
})
// Global navigation guard for protected routes and login restriction
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Check if the user is authenticated
  const isAuthenticated = !!authStore.authToken;

  // If the route requires authentication and the user is not authenticated
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    return next({ name: 'login' });
  }

  // If user is authenticated and tries to access the login page, redirect to chat
  if (to.name === 'home' && isAuthenticated) {
    return next({ name: 'messenger' });
  }

  // Otherwise, allow the navigation
  next();
});

export default router
