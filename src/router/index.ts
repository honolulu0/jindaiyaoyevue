import { deviceTypeSubject, parkingSubject, topTabsSubject } from '@/event';
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
    },
    {
      path: '/parkEnterprise',
      name: 'parkEnterprise',
      component: () => import('../pages/parkEnterprise.vue')
    },
    {
      path: '/parkServices',
      name: 'parkServices',
      component: () => import('../pages/parkServices.vue')
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
    "/parkPolicy": 7,
    "/parkEnterprise": 7,
    "/parkServices": 7
  };

  if (pathToIndex.hasOwnProperty(to.path)) {
    topTabsSubject.next(pathToIndex[to.path as keyof typeof pathToIndex] ?? 0);

    if(to.path == "/comprehensiveSituation"){
      deviceTypeSubject.next([]);
    }else if(to.path == "/parkInvestmentPromotion"){
      deviceTypeSubject.next([{
        id: 8,  // EST_Shexiangtou
        text: "摄像头",
        icon: "安防监控"
      }]);
    }else if(to.path == "/securitySituation"){
      deviceTypeSubject.next([{
        id: 8,  // EST_Shexiangtou
        icon: "安防监控",
      },{
        id: 4,  // EST_Dianziweilan
        icon: "电子围栏",
      },{
        id: 1,  // EST_Chepai
        text: "车辆道闸",
        icon: "车牌识别"
      },{
        id: 7,  // EST_Ruqinjingbao
        icon: "入侵报警"
      }]);
    }else if(to.path == "/parkFacilities"){
      deviceTypeSubject.next([{
        id: 11,  // EST_Yanbao
        icon: "烟感报警"
      },{
        id: 5,  // EST_Jinggai
        icon: "智慧井盖"
      },{
        id: 10,  // EST_Shuiwei
        text: "智能水节点",
        icon: "水节点监测"
      },{
        id: 2,  // EST_Chewei
        text: "车位引导",
        icon: "车牌识别"
      }]);
    }else if(to.path == "/powerEnvironment"){
      deviceTypeSubject.next([{
        id: 6,  // EST_Peidianfang
        icon: "配电房状态",
        text: "配电房"
      },{
        id: 3,  // EST_Dianbiao
        icon: "电表数据",
        text: "电表"
      }]);
    }else if(to.path == "/energyConsumptionSituation"){
      deviceTypeSubject.next([{
        id: 6,  // EST_Peidianfang
        icon: "配电房状态",
        text: "配电房"
      },{
        id: 3,  // EST_Dianbiao
        icon: "电表数据",
        text: "电表"
      },{
        id: 10,  // EST_Shuiwei
        text: "智能水节点",
        icon: "水节点监测"
      },{
        id: 9,  // EST_Shuibiao
        text: "水表",
        icon: "水表数据"
      }]);
    }else{
      deviceTypeSubject.next([]);
    }

    if (to.path === "/parkFacilities" || to.path === "/comprehensiveSituation" || to.path === "/parkInvestmentPromotion" || to.path === "/securitySituation") {
      parkingSubject.next(true);
    } else {
      parkingSubject.next(false);
    }
  }
});

export default router 

