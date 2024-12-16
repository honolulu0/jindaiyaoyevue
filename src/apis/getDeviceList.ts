import instance from "./axios"
import { getMockDeviceList } from "./mock/deviceList"

// 请求参数接口
export interface DeviceListParams {
  device_name?: string
  device_type?: string
  location?: string
  is_valid?: boolean
  online_status?: boolean
  page?: number
  page_size?: number
}

// DTO 接口定义
export interface DeviceListDTO {
  fields: {
    name: string
    label: string
  }[]
  items: {
    device_type: string
    device_name: string
    location: string
    is_valid: number
    online_status: number
  }[]
  total: number
  page: number
  page_size: number
}

// VO 接口定义
export interface DeviceListVO {
  headers: Record<string, string>  // 表头映射
  items: Record<string, string>[]
  total: number
  page: number
  page_size: number
}

const url = "/park_api/device/list/"

// DTO 转 VO 的转换函数
const convertToVO = (dto: DeviceListDTO): DeviceListVO => {
  if (!dto || !dto.fields || !dto.items) {
    throw new Error('Invalid DTO data')
  }

  // 表头
  const headers = dto.fields.reduce((acc, field) => {
    acc[field.name] = field.label
    return acc
  }, {} as Record<string, string>)

  // 创建字段映射关系
  const fieldMapping: Record<string, keyof typeof dto.items[0]> = {
    device_name: 'device_name',
    location: 'location',
    device_type: 'device_type',
    online_status: 'online_status',
    is_valid: 'is_valid'
  }

  // 转换列表数据
  const items = dto.items.map(item => {
    const convertedItem: Record<string, string> = {}

    const deviceMapping: Record<string, { title: string, img: string }> = {
      'video_surveillance': { title: '监控', img: 'parkFacilities/监控icon.png' },
      'intrusion_alarm': { title: '入侵报警', img: 'parkFacilities/入侵报警icon.png' },
      'electronic_fence': { title: '电子围栏', img: 'parkFacilities/电子围栏icon.png' },
      'smoke_alarm': { title: '烟感报警', img: 'parkFacilities/烟感报警icon.png' },
      'vehicle_barrier': { title: '车牌识别', img: 'parkFacilities/车牌识别icon.png' },
      'smart_manhole': { title: '智慧井盖', img: 'parkFacilities/智慧井盖icon.png' },
      'water_node': { title: '水节点', img: 'parkFacilities/水节点监测icon.png' },
      'water_meter': { title: '水表', img: 'parkFacilities/水表数据icon.png' },
      'power_cabinet': { title: '配电房', img: 'parkFacilities/配电房状态icon.png' },
      'electric_meter': { title: '电表', img: 'parkFacilities/电表数据icon.png' },
      'parking': { title: '车位识别', img: 'parkFacilities/车位识别icon.png' }
    }
    
    dto.fields.forEach((field, index) => {
      const fieldKey = fieldMapping[field.name]
      const value = item[fieldKey]

      if (field.name === 'device_type') {
        convertedItem[`row${index + 1}`] = deviceMapping[value]?.title ?? value
      } else if (field.name === 'online_status') {
        convertedItem[`row${index + 1}`] = String(value)
      } else if (field.name === 'is_valid') {
        convertedItem[`row${index + 1}`] = value === 1 ? "可用" : "不可用"
      } else {
        convertedItem[`row${index + 1}`] = String(value)
      }
    })
    // console.log(convertedItem)
    return convertedItem
  })

  return {
    headers,
    items,
    total: dto.total,
    page: dto.page,
    page_size: dto.page_size
  }
}

// 获取设备列表的接口
export const getDeviceList = async (params: DeviceListParams = {}) => {
  const defaultParams: DeviceListParams = {
    page: 1,
    page_size: 10000,
    ...params
  }
  
  try {
    const res = await instance.get<DeviceListDTO>(url, {
      params: defaultParams
    })
    
    // const res = await getMockDeviceList(defaultParams)
    
    if (!res.data.fields) {
      throw new Error('Invalid response data')
    }

    return convertToVO(res.data)
  } catch (error) {
    console.error('获取设备列表失败:', error)
    // 返回空数据
    return {
      headers: {},
      items: [],
      total: 0,
      page: defaultParams.page,
      page_size: defaultParams.page_size
    }
  }
}
