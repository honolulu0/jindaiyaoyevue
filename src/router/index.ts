import { topTabsSubject } from '@/event';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: "/comprehensiveSituation"
    },
    {
      path: "/comprehensiveSituation",
      name: 'comprehensiveSituation',
      component: () => import('../pages/comprehensiveSituation.vue')
    },
    {
      path: "/parkInvestmentPromotion",
      name: 'parkInvestmentPromotion',
      component: () => import('../pages/parkInvestmentPromotion.vue')
    },
    {
      path: "/securitySituation",
      name: 'securitySituation',
      component: () => import('../pages/securitySituation.vue')
    },
    {
      path: "/parkFacilities",
      name: 'parkFacilities',
      component: () => import('../pages/parkFacilities.vue')
    },
    {
      path: '/powerEnvironment',
      name: 'powerEnvironment',
      component: () => import('../pages/powerEnvironment.vue')
    },
    {
      path: '/energyConsumptionSituation',
      name: 'energyConsumptionSituation',
      component: () => import('../pages/energyConsumptionSituation.vue')
    },
    {
      path: '/enterprises',
      name: 'enterprises',
      component: () => import('../pages/enterprises.vue')
    },
    {
      path: '/partyBuilding',
      name: 'partyBuilding',
      component: () => import('../pages/partyBuilding.vue')
    },
    {
      path: '/parkPolicy',
      name: 'parkPolicy',
      component: () => import('../pages/parkPolicy.vue')
    }
  ]
})

// 添加全局后置钩子
router.afterEach((to, from) => {
  const pathToIndex = {
    "/comprehensiveSituation": 0,
    "/parkInvestmentPromotion": 1,
    "/securitySituation": 2,
    "/parkFacilities": 3,
    "/powerEnvironment": 4,
    "/energyConsumptionSituation": 5,
    "/enterprises": 6,
    "/partyBuilding": 7,
    "/parkPolicy": 7
  };

  if (pathToIndex.hasOwnProperty(to.path)) {
    topTabsSubject.next(pathToIndex[to.path as keyof typeof pathToIndex] ?? 0);
  }
});

export default router 

