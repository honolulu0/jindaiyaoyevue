import { BehaviorSubject } from 'rxjs';

// 定义设备类型接口
export interface DeviceType {
  id: number;
  text?: string;
  icon: string;
  isClick: boolean;
}

// 为每个页面创建独立的 subject
export const deviceTypeStates: Record<string, BehaviorSubject<DeviceType[]>> = {
  comprehensiveSituation: new BehaviorSubject<DeviceType[]>([]),
  
  parkInvestmentPromotion: new BehaviorSubject<DeviceType[]>([{
    id: 8,
    text: "摄像头",
    icon: "安防监控",
    isClick: false
  }]),
  
  securitySituation: new BehaviorSubject<DeviceType[]>([
    {
      id: 8,
      icon: "安防监控",
      isClick: false
    },
    {
      id: 4,
      icon: "电子围栏",
      isClick: false
    },
    {
      id: 1,
      text: "车辆道闸",
      icon: "车牌识别",
      isClick: false
    },
    {
      id: 7,
      icon: "入侵报警",
      isClick: false
    }
  ]),
  
  parkFacilities: new BehaviorSubject<DeviceType[]>([
    {
      id: 11,
      icon: "烟感报警",
      isClick: false
    },
    {
      id: 5,
      icon: "智慧井盖",
      isClick: false
    },
    {
      id: 10,
      text: "智能水节点",
      icon: "水节点监测",
      isClick: false
    },
    {
      id: 2,
      text: "车位引导",
      icon: "车牌识别",
      isClick: false
    }
  ]),
  
  powerEnvironment: new BehaviorSubject<DeviceType[]>([
    {
      id: 6,
      icon: "配电房状态",
      text: "配电房",
      isClick: false
    },
    {
      id: 3,
      icon: "电表数据",
      text: "电表",
      isClick: false
    }
  ]),
  
  energyConsumptionSituation: new BehaviorSubject<DeviceType[]>([
    {
      id: 6,
      icon: "配电房状态",
      text: "配电房",
      isClick: false
    },
    {
      id: 3,
      icon: "电表数据",
      text: "电表",
      isClick: false
    },
    {
      id: 10,
      text: "智能水节点",
      icon: "水节点监测",
      isClick: false
    },
    {
      id: 9,
      text: "水表",
      icon: "水表数据",
      isClick: false
    }
  ]),
  
  enterprises: new BehaviorSubject<DeviceType[]>([]),
  partyBuilding: new BehaviorSubject<DeviceType[]>([]),
  parkPolicy: new BehaviorSubject<DeviceType[]>([]),
  parkEnterprise: new BehaviorSubject<DeviceType[]>([]),
  parkServices: new BehaviorSubject<DeviceType[]>([])
}; 