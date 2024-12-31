import instance from "./axios"
import { getMockDeviceList } from "./mock/deviceList"

// 请求参数接口
export interface DeviceListParams {
  device_name?: string
  device_type?: string
  device_type_names?: string[]
  location?: string
  // is_valid?: boolean
  // online_status?: boolean
  page?: number
  page_size?: number
}

// DTO 接口定义
export interface DeviceListDTO {
  items: {
    id: number;
    device_name: string;
    device_type: number;
    is_valid: string;
    location: string;
    device_type_name: string;
    status: string;
  }[]
  total: number
  page: number
  page_size: number
}

// VO 接口定义
export interface DeviceListVO {
  headers: Record<string, string>  // 表头映射
  items: Record<string, string>[]
  rawItems: DeviceListDTO['items']
  total: number
  page: number
  page_size: number
}

const url = "/park_api/device/list/"

// DTO 转 VO 的转换函数
const convertToVO = (dto: DeviceListDTO): DeviceListVO => {
  // 表头
  const headers = {
    row1: '设备名称',
    row2: '设备类型',
    row3: '设备状态'
  }

  // 转换列表数据
  const items = dto.items.map(item => ({
    row1: item.location,
    row2: item.device_type_name,
    row3: item.status
  }))

  return {
    headers,
    items,
    rawItems: dto.items,
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
  
  // 创建 URLSearchParams 对象来处理数组参数
  const searchParams = new URLSearchParams();
  
  // 处理所有参数
  Object.entries(defaultParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // 如果是数组，为每个值添加同名参数
      value.forEach(item => {
        searchParams.append(key, item);
      });
    } else if (value !== undefined) {
      // 非数组且非空的参数正常添加
      searchParams.append(key, String(value));
    }
  });
  
  try {
    const res = await instance.get<DeviceListDTO>(url, {
      params: searchParams
    })

    return convertToVO(res.data)
  } catch (error) {
    console.error('获取设备列表失败:', error)
    // 返回空数据
    return {
      headers: {},
      items: [],
      rawItems: [],
      total: 0,
      page: defaultParams.page,
      page_size: defaultParams.page_size
    }
  }
}
