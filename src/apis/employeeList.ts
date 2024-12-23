import {jindai3adminInstance} from "./axios"

// DTO 接口定义
export interface EmployeeListDTO {
    id: string;
    name: string;
    company: string;
    title: string;
    phone: string;
    category: string;
    imgUrl: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

// VO 接口定义
export interface EmployeeListVO {
  name: string
  phone: string
  job: string
  img: string
  description: string
}

// DTO 转 VO 的转换函数
const convertToVO = (dto: EmployeeListDTO[]): EmployeeListVO[] => {
  return dto.map(item => ({
    name: item.name,
    phone: item.phone,
    job: item.title,
    img: item.imgUrl || '',
    description: item.description || `${item.name}是一名${item.title},在${item.company}工作。`
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

  try {
    const res = await jindai3adminInstance.get<EmployeeListDTO>('/employee/all') as any
    return convertToVO(res.data)
  } catch (error) {
    console.error('获取员工列表失败:', error)
    return []
  }
} 