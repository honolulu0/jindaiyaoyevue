import { DeviceListDTO } from "@/apis/getDeviceList"

// 设备类型列表
const deviceTypes = [
  'video_surveillance',
  'intrusion_alarm',
  'electronic_fence',
  'smoke_alarm',
  'vehicle_barrier',
  'smart_manhole',
  'water_node',
  'water_meter',
  'power_cabinet',
  'electric_meter',
  'parking'
]

// 位置列表
const locations = [
  'A栋101室',
  'B栋202室',
  'C栋303室',
  'D栋404室',
  '停车场A区',
  '园区东门',
  '园区西门',
  '配电柜1号',
  '水泵房',
  '监控室'
]

// Mock 数据生成函数
export const getMockDeviceList = (params: {
  device_name?: string
  device_type?: string
  location?: string
  is_valid?: boolean
  online_status?: boolean
  page?: number
  page_size?: number
}): DeviceListDTO => {
  // 生成基础数据
  const mockItems = Array.from({ length: params.page_size || 100 }, (_, index) => ({
    device_type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
    device_name: `Device_${index + 1}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    is_valid: Math.random() > 0.1 ? 1 : 0,
    online_status: Math.random() > 0.2 ? 1 : 0
  }))

  // 应用筛选条件
  let filteredItems = mockItems.filter(item => {
    if (params.device_name && !item.device_name.toLowerCase().includes(params.device_name.toLowerCase())) {
      return false
    }
    if (params.device_type && !item.device_type.includes(params.device_type)) {
      return false
    }
    if (params.location && !item.location.includes(params.location)) {
      return false
    }
    if (params.is_valid !== undefined && item.is_valid !== (params.is_valid ? 1 : 0)) {
      return false
    }
    if (params.online_status !== undefined && item.online_status !== (params.online_status ? 1 : 0)) {
      return false
    }
    return true
  })

  // 分页处理
  const page = params.page || 1
  const pageSize = params.page_size || 10
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pagedItems = filteredItems.slice(start, end)

  return {
    fields: [
      { name: "device_type", label: "设备类型" },
      { name: "device_name", label: "设备名称" },
      { name: "location", label: "位置信息" },
      { name: "is_valid", label: "是否可用" },
      { name: "online_status", label: "在线状态" }
    ],
    items: pagedItems,
    total: filteredItems.length,
    page,
    page_size: pageSize
  }
}

// 使用示例：
// const mockData = getMockDeviceList({
//   device_name: "Device",
//   page: 1,
//   page_size: 10
// }) 