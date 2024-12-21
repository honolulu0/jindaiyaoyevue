import instance from './axios'

// 请求参数接口
export interface RepairListParams {
  page?: number
  limit?: number
}

// DTO 接口定义
export interface RepairListDTO {
  code: number
  msg: string
  page: number
  limit: number
  total: number
  is_next: boolean
  is_previous: boolean
  data: {
    id: number
    order_type: number
    title: string
    building_room: string | null
    company_name: string
    contact_name: string
    contact_phone: string
    description: string
    status: number
    status_label: string
    category_name?: string
    park_name?: string
    create_datetime: string
  }[]
}

// VO 接口定义
export interface RepairListVO {
  id: number
  row1: string // 类别
  row2: string // 所在位置
  row3: string // 事件描述
  row4: string // 日期
  row5: string // 事件进度
  raw: any // 添加原始数据字段
}

// DTO 转 VO 的转换函数
const convertToVO = (dto: RepairListDTO): RepairListVO[] => {
  return dto.data.map(item => ({
    id: item.id,
    row1: item.category_name || '其他类型',
    row2: item.building_room || '未知位置',
    row3: item.description,
    row4: item.create_datetime.split(' ')[0].split('-').slice(1).join('/'),
    row5: item.status_label,
    raw: item // 保存原始数据
  }))
}

// 获取报修列表的接口
export const getRepairList = async (params: RepairListParams = {}) => {
  const defaultParams = {
    page: 1,
    limit: 10000,
    ...params
  }

  try {
    const res = await instance.get<RepairListDTO>('/api/system/repair/order/', {
      params: defaultParams
    }) as any

    if (res.code !== 2000) {
      throw new Error(res.msg || '获取报修列表失败')
    }

    return convertToVO(res)
  } catch (error) {
    console.error('获取报修列表失败:', error)
    return []
  }
} 