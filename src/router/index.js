import { createRouter, createWebHashHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import CalendarView from '@/views/CalendarView.vue';
import PrivacyView from '@/views/PrivacyView.vue';
import AboutView from '@/views/AboutView.vue';
import WeatherView from '@/views/WeatherView.vue';
import DashboardView from '@/views/DashboardView.vue';
import LoginView from '@/views/LoginView.vue';
import authService from '@/services/authService.js';


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherView,
      meta: { requiresAuth: true }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      meta: { requiresAuth: true }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authService.isLoggedIn()) {
      alert('請先登入，將轉回首頁');
      next({ name: 'welcome' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
