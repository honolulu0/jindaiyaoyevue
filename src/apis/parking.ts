import instance from './axios'

// DTO 接口定义
export interface CarInOutRecordDTO {
  Picture: string
  InAutoPlate?: string
  AutoPlate?: string
  Time: string
  InLaneName?: string
  LaneName?: string
  status: '入' | '出'
}

// VO 接口定义
export interface CarInOutRecordVO {
  carNumber: string
  type: string
  time: string
  position: string
  img: string
}

// DTO 转 VO 的转换函数
const convertToVO = (dto: CarInOutRecordDTO[]): CarInOutRecordVO[] => {
  return dto.map(record => ({
    carNumber: record.InAutoPlate || record.AutoPlate || '',
    type: record.status,
    time: new Date(record.Time).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }),
    position: record.InLaneName || record.LaneName || '',
    img: record.Picture
  }))
}

// 获取车辆进出记录的接口
export const getCarInOutRecords = async () => {
  try {
    const data = (await instance.get<CarInOutRecordDTO[]>('/park_api/device/chezha/inandout')) as unknown as CarInOutRecordDTO[]
    return convertToVO(data)
  } catch (error) {
    console.error('获取车辆进出记录失败:', error)
    return []
  }
}
