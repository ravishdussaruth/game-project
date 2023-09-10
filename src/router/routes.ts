import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'app.home',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/english',
        name: 'app.english',
        component: () => import('pages/Stages/English/EnglishIndex.vue'),
        meta: {
          requiresAuth: true
        }
      },

      {
        path: '/french',
        name: 'app.french',
        component: () => import('pages/Stages/French/FrenchIndex.vue'),
        meta: {
          requiresAuth: true
        }
      },

      {
        path: '/maths',
        name: 'app.maths',
        component: () => import('pages/Stages/Maths/MathsIndex.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'login',
        component: () => import('pages/SignInPage.vue')
      },
      {
        path: 'register',
        component: () => import('pages/SignUpPage.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
