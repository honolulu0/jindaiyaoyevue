import instance from '@/apis/axios'

// 请求参数接口
export interface ServiceListParams {
  category_name?: string
  page?: number
  limit?: number
}

// DTO 接口定义
export interface ServiceListDTO {
  code: number
  msg: string
  page: number
  limit: number
  total: number
  is_next: boolean
  is_previous: boolean
  data: {
    id: number
    title: string
    cover_url: string
    description: string | null
    sort: number
    status: boolean
    create_datetime: string
    update_datetime: string
  }[]
}

// VO 接口定义
export interface ServiceListVO {
  items: {
    id: number
    name: string
    img: string
    sort: number
  }[]
  total: number
  page: number
  pageSize: number
}

// DTO 转 VO 的转换函数
const convertToVO = (dto: ServiceListDTO): ServiceListVO => {
  if (!dto || !dto.data) {
    throw new Error('Invalid DTO data')
  }

  const items = dto.data.map(item => ({
    id: item.id,
    name: item.title,
    img: `url(${item.cover_url})`,
    sort: item.sort
  }))

  return {
    items,
    total: dto.total,
    page: dto.page,
    pageSize: dto.limit
  }
}

// 获取服务列表的接口
export const getServiceList = async (params: ServiceListParams = {}) => {
  const defaultParams: ServiceListParams = {
    category_name: '服务类型',
    page: 1,
    limit: 10,
    ...params
  }
  
  try {
    const { data: res } = await instance.get<ServiceListDTO>('/api/article/', {
      params: defaultParams
    })
    
    if (res.code !== 2000) {
      throw new Error(res.msg || '获取服务列表失败')
    }

    return convertToVO(res)
  } catch (error) {
    console.error('获取服务列表失败:', error)
    // 返回空数据
    return {
      items: [],
      total: 0,
      page: defaultParams.page,
      pageSize: defaultParams.limit
    }
  }
}
