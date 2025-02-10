import { jindai3adminInstance } from './axios'

// DTO 接口定义
export interface EmployeeCountDTO {
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
export interface EmployeeCountVO {
  title: string
  value: string | number
  unit: string
  icon: string
}

// DTO 转 VO 的映射
// const departmentMapping: Record<string, { title: string; icon: string }> = {
//   '安保部': {
//     title: '保安',
//     icon: '保安icon.png'
//   },
//   '保洁部': {
//     title: '保洁',
//     icon: '保洁icon.png'
//   },
//   '维修部': {
//     title: '保修',
//     icon: '报修icon.png'
//   },
//   '运营部': {
//     title: '保绿',
//     icon: '保绿icon.png'
//   },
//   '客服部': {
//     title: '客服',
//     icon: '客服icon.png'
//   }
// }

// DTO 转 VO 的转换函数
const convertToVO = (dto: EmployeeCountDTO[]): EmployeeCountVO[] => {
  const baseUrl = new URL('../assets/enterprises', import.meta.url).href

  const baoAn = dto.filter(item => item.category === '保安')
  const baoJie = dto.filter(item => item.category === '保洁')
  const baoXiu = dto.filter(item => item.category === '保修')
  const baoLv = dto.filter(item => item.category === '保绿')
  const keFu = dto.filter(item => item.category === '客服')

  return [
    {
      title: '保安',
      value: baoAn.length,
      unit: '人',
      icon: `url(${encodeURI(`${baseUrl}/保安icon.png`)})`
    },
    {
      title: '保洁',
      value: baoJie.length,
      unit: '人',
      icon: `url(${encodeURI(`${baseUrl}/保洁icon.png`)})`
    },
    {
      title: '保修',
      value: baoXiu.length,
      unit: '人',
      icon: `url(${encodeURI(`${baseUrl}/报修icon.png`)})`
    },
    {
      title: '保绿',
      value: baoLv.length,
      unit: '人',
      icon: `url(${encodeURI(`${baseUrl}/保绿icon.png`)})`
    },
    {
      title: '客服',
      value: keFu.length,
      unit: '人',
      icon: `url(${encodeURI(`${baseUrl}/客服icon.png`)})`
    }
  ]
}

// 获取员工数量统计的接口
export const getEmployeeCount = async () => {
  try {
    const res = await jindai3adminInstance.get<EmployeeCountDTO>('/employee/all') as any

    console.log(res)

    if (res.code !== 200) {
      throw new Error(res.msg || '获取员工数量统计失败')
    }

    return convertToVO(res.data)
  } catch (error) {
    console.error('获取员工数量统计失败:', error)
    return []
  }
}
