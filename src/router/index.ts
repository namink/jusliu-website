import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.path !== from.path) return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('@/views/WorksView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

const ROUTE_ORDER: Record<string, number> = {
  home: 0,
  works: 1,
  about: 2
}

export function getRouteIndex(name: string): number {
  return ROUTE_ORDER[name] ?? 0
}

export default router
