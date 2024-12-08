import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue')
    },
    {
      path: '/parkInvestmentPromotion',
      name: 'parkInvestmentPromotion',
      component: () => import('../pages/parkInvestmentPromotion.vue')
    },
    {
      path: '/parkFacilities',
      name: 'parkFacilities',
      component: () => import('../pages/parkFacilities.vue')
    },
    {
      path: '/securitySituation',
      name: 'securitySituation',
      component: () => import('../pages/securitySituation.vue')
    },
    {
      path: '/enterprises',
      name: 'enterprises',
      component: () => import('../pages/enterprises.vue')
    }
  ]
})

export default router 

