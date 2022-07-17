import * as path from "path";

const routes = [
  {
    path: '/module-auth/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Auth/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth : true },
    children: [
      { path: '', name: 'root',  component: () => import('pages/IndexPage.vue') },

    ]
  },
  {
    path: '/reservations',
    component: () => import('layouts/ReservationLayout.vue'),
    meta: { requiresAuth : true },
    children: [
      { path: '', name: 'ReservationPage', component: () => import('pages/Reservations/Index.vue') },
    ]
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes