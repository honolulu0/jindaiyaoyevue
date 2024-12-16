import instance from "./axios";

// 定义后端返回的数据类型（DTO）
// 注意：这里的类型根据实际后端返回的数据结构可能需要调整
export interface ParkSupportingDTO {
  id: number;
  name: string;
  count: number;
  unit: string;
  iconUrl?: string;
}

// 定义前端使用的数据类型（VO）
export interface ParkSupportingVO {
  key: number;
  icon: string;
  title: string;
  data: string;
  unit: string;
  position: {
    top: number;
    left: number;
  };
}

// 位置配置
const positionConfig = [
  { top: 0, left: 0 },
  { top: 0, left: 101 },
  { top: 31, left: 0 },
  { top: 31, left: 101 },
  { top: 62, left: 0 },
  { top: 62, left: 101 },
  { top: 93, left: 0 },
  { top: 93, left: 101 },
];

// 图标映射配置
const iconMapping: Record<string, string> = {
  "公寓": "公寓icon.png",
  "停车位": "停车位icon.png",
  "多功能会议厅": "多功能会议厅icon.png",
  "共享智慧化会议室": "会议室icon.png",
  "餐厅": "餐厅icon.png",
  "24小时便利店": "24小时便利店icon.png",
  "休闲区": "休闲区icon.png",
  "健身区": "健身区icon.png",
};

// DTO 到 VO 的转换函数
export function convertToVO(dto: ParkSupportingDTO[]): ParkSupportingVO[] {
  const baseUrl = new URL('../assets/', import.meta.url).href;
  
  return dto.map((item, index) => ({
    key: item.id,
    icon: encodeURI(`${baseUrl}${iconMapping[item.name]}`),
    title: item.name,
    data: item.count.toString(),
    unit: item.unit,
    position: positionConfig[index] || { top: 0, left: 0 }
  }));
}

// API 请求函数
const url = ""; // 等待后端提供接口

export const getParkSupportingData = async (): Promise<ParkSupportingVO[]> => {
  const res = await instance.get<ParkSupportingDTO[]>(url);
  return convertToVO(res.data);
};


// <script setup lang="ts">
// import { ref, onMounted } from 'vue';
// import { getParkSupportingData } from '@/apis/getParkSupportingData';
// import type { ParkSupportingVO } from '@/apis/getParkSupportingData';

// const parkSupporting = ref<ParkSupportingVO[]>([]);

// onMounted(async () => {
//   try {
//     parkSupporting.value = await getParkSupportingData();
//   } catch (error) {
//     console.error('获取园区配套数据失败:', error);
//   }
// });
// </script>