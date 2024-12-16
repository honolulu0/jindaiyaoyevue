import instance from "./axios"

// DTO 接口定义
export interface EmployeeListDTO {
  code: number
  msg: string
  page: number
  limit: number
  total: number
  data: {
    id: number
    name: string
    age: number
    phone: string
    position: string
    dept_name: string
    company_name: string
    photo_url: string | null
    description: string | null
    create_datetime: string
  }[]
}

// VO 接口定义
export interface EmployeeListVO {
  name: string
  age: number
  job: string
  img: string
  description: string
}

// DTO 转 VO 的转换函数
const convertToVO = (dto: EmployeeListDTO): EmployeeListVO[] => {
  return dto.data.map(item => ({
    name: item.name,
    age: item.age,
    job: item.position,
    img: item.photo_url || '',
    description: item.description || `${item.name}是一名${item.position},在${item.dept_name}工作。`
  }))
}

// 获取员工列表的接口
export const getEmployeeList = async (params: {
  page?: number
  limit?: number
  name?: string
  company_name?: string
  dept_name?: string
  keyword?: string
  company_id?: number
  dept_id?: number
} = {}) => {
  const defaultParams = {
    page: 1,
    limit: 10000,
    ...params
  }

  try {
    const res = await instance.get<EmployeeListDTO>('/api/system/employee/employee_list/', {
      params: defaultParams
    }) as any

    if (res.code !== 2000) {
      throw new Error(res.msg || '获取员工列表失败')
    }

    return convertToVO(res)
  } catch (error) {
    console.error('获取员工列表失败:', error)
    return []
  }
} 