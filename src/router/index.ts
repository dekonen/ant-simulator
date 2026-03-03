import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'play',
      path: '/play',
      component: () => import('@/pages/play-view.vue')
    },
    {
      name: 'index',
      path: '/',
      component: () => import('@/pages/index-view.vue')
    }
  ],
})

export default router
