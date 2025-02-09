import instance from './axios'

// DTO 接口定义
export interface EmployeeCountDTO {
  code: number
  msg: string
  page: number
  limit: number
  total: number
  data: {
    id: number
    name: string
    employee_count: number
  }[]
}

// VO 接口定义
export interface EmployeeCountVO {
  title: string
  value: string | number
  unit: string
  icon: string
}

// DTO 转 VO 的映射
const departmentMapping: Record<string, { title: string; icon: string }> = {
  '安保部': {
    title: '保安',
    icon: '保安icon.png'
  },
  '保洁部': {
    title: '保洁',
    icon: '保洁icon.png'
  },
  '维修部': {
    title: '保修',
    icon: '报修icon.png'
  },
  '运营部': {
    title: '保绿',
    icon: '保绿icon.png'
  },
  '客服部': {
    title: '客服',
    icon: '客服icon.png'
  }
}

// DTO 转 VO 的转换函数
const convertToVO = (dto: EmployeeCountDTO): EmployeeCountVO[] => {
  const baseUrl = new URL('../assets/enterprises', import.meta.url).href

  return dto.data.map(item => ({
    title: departmentMapping[item.name].title,
    value: item.employee_count,
    unit: '人',
    icon: `url(${encodeURI(`${baseUrl}/${departmentMapping[item.name].icon}`)})`
  }))
}

// 获取员工数量统计的接口
export const getEmployeeCount = async () => {
  try {
    const res = await instance.get<EmployeeCountDTO>('/api/system/dept/employee-count/') as any

    console.log(res)

    if (res.code !== 2000) {
      throw new Error(res.msg || '获取员工数量统计失败')
    }

    return convertToVO(res)
  } catch (error) {
    console.error('获取员工数量统计失败:', error)
    return []
  }
}
