import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayoutHome from '../layouts/AppLayoutHome.vue'
import AppLayoutDefault from '../layouts/AppLayoutDefault.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
        layout: AppLayoutHome
      }
    },
    {
      path: '/advertises',
      name: 'AdvertiseIndex',
      component: () => import('../views/advertise/AdvertiseIndex.vue'),
      meta: {
        requiresAuth: true,
        layout: AppLayoutHome
      }
    },
    {
      path: '/advertise/create',
      name: 'AdvertiseCreate',
      component: () => import('../views/advertise/AdvertiseCreate.vue'),
      meta: {
        requiresAuth: true,
        layout: AppLayoutHome
      }
    },
    {
      path: '/advertise/:id/edit',
      name: 'AdvertiseEdit',
      component: () => import('../views/advertise/AdvertiseEdit.vue'),
      props: true,
      meta: {
        requiresAuth: true,
        layout: AppLayoutHome
      }
    },
    {
      path: '/login',
      name: 'AuthLogin',
      component: () => import('../views/auth/AuthLogin.vue'),
      meta: {
        guest: true,
        layout: AppLayoutDefault,
      }
    },
    {
      path: '/signup',
      name: 'AuthSignup',
      component: () => import('../views/auth/AuthSignup.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/logout',
      name: 'AuthLogout',
      beforeEnter (to, from, next) {
        localStorage.clear();
        next({ name: 'AuthLogin' })
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({ name: 'AuthLogin' });
    } else {
      // let user = JSON.parse(localStorage.getItem('user'));
      next();
    }
  } else {
    next();
  }
});

export default router
