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
      text: "消费管廊",
      icon: "水节点监测",
      isClick: false
    },
  ]),
  
  powerEnvironment: new BehaviorSubject<DeviceType[]>([
    {
      id: 6,
      icon: "配电房状态",
      text: "配电房",
      isClick: false
    },
  ]),
  
  energyConsumptionSituation: new BehaviorSubject<DeviceType[]>([
    {
      id: 6,
      icon: "配电房状态",
      text: "配电房",
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