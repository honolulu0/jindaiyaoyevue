import instance from "./axios"

// DTO 类型定义
export interface DeviceCountDTO {
  by_type: {
    type_name: string
    total: number
    online: string | number
    valid: string | number
  }[]
}

// VO 类型定义
export interface DeviceCountVO {
  key?: number
  title: string
  img: string
  number: number
  unit: string
  left?: number
  top?: number
}

// 安全设备 VO 类型
export interface SecurityDeviceVO {
  title: string
  number: number
  unit: string
  url: string
}

const url = "/park_api/device/count/"; 

// 获取设备数量的接口
export const getDeviceCount = async () => {
  const res = await instance.get<DeviceCountDTO>(url)
  return {
    smartDevices: convertToSmartDeviceVO(res.data),
    securityDevices: convertToSecurityDeviceVO(res.data)
  }
}

// 转换函数 - 智能设备
const convertToSmartDeviceVO = (dto: DeviceCountDTO): DeviceCountVO[] => {
  const baseUrl = new URL('../assets', import.meta.url).href
  
  const deviceMapping: Record<string, { title: string, img: string }> = {
    '视频监控': { title: '视频监控', img: 'parkFacilities/监控icon.png' },
    '入侵报警': { title: '入侵报警', img: 'parkFacilities/入侵报警icon.png' },
    '电子围栏': { title: '电子围栏', img: 'parkFacilities/电子围栏icon.png' },
    '烟感报警': { title: '烟感报警', img: 'parkFacilities/烟感报警icon.png' },
    '车辆道闸': { title: '车辆道闸', img: 'parkFacilities/车牌识别icon.png' },
    '智能井盖': { title: '智能井盖', img: 'parkFacilities/智慧井盖icon.png' },
    '消费管廊': { title: '消费管廊', img: 'parkFacilities/水节点监测icon.png' },
    '水表': { title: '水表', img: 'parkFacilities/水表数据icon.png' },
    '智能配电柜': { title: '配电房', img: 'parkFacilities/配电房状态icon.png' },
    '电表': { title: '电表', img: 'parkFacilities/电表数据icon.png' },
    '车位': { title: '车位', img: 'parkFacilities/车位识别icon.png' }
  }

  return dto.by_type.map((item, index) => ({
    key: index + 1,
    title: deviceMapping[item.type_name]?.title || item.type_name,
    img: `${encodeURI(`${baseUrl}/${deviceMapping[item.type_name]?.img}`)}`,
    number: item.total,
    unit: '台'
  }))
}

// 转换函数 - 安全设备
const convertToSecurityDeviceVO = (dto: DeviceCountDTO): SecurityDeviceVO[] => {
  const baseUrl = new URL('../assets', import.meta.url).href
  
  const securityMapping: Record<string, { title: string, img: string }> = {
    '视频监控': { title: '视频监控', img: 'securityEquipment/监控+底座.png' },
    '入侵报警': { title: '入侵报警', img: 'securityEquipment/入侵报警+底座.png' },
    '电子围栏': { title: '电子围栏', img: 'securityEquipment/电子围栏+底座.png' },
    '车辆道闸': { title: '车牌识别', img: 'securityEquipment/车牌识别+底座.png' }
  }

  const res = dto.by_type
    .filter(item => securityMapping[item.type_name])
    .map(item => ({
      title: securityMapping[item.type_name].title,
      number: item.total,
      unit: '台',
      url: `url(${encodeURI(`${baseUrl}/${securityMapping[item.type_name].img}`)})`
    }))

  return res
}

//smartDevice.vue
// <script setup lang="ts">
// import { ref, onMounted } from 'vue'
// import { getDeviceCount } from '@/apis/deviceCount'

// const contentItem = ref([])

// onMounted(async () => {
//   const { smartDevices } = await getDeviceCount()
//   contentItem.value = smartDevices
// })
// </script>

//securityEquipment.vue
// <script setup lang="ts">
// import { ref, onMounted } from 'vue'
// import { getDeviceCount } from '@/apis/deviceCount'

// const contentItem = ref([])

// onMounted(async () => {
//   const { securityDevices } = await getDeviceCount()
//   contentItem.value = securityDevices
// })
// </script>
