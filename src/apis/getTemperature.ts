import instance from "./axios";

// DTO类型定义 (根据后端接口返回类型进行调整)
interface TemperatureDTO {
  temperature?: number;
  unit?: string;
  timestamp?: string;
  // 其他可能的字段...
}

// VO类型定义
interface TemperatureVO {
  temperature: string; // 格式化后的温度，如 "20°C"
}

// DTO到VO的转换函数
const transformTemperature = (dto: TemperatureDTO): TemperatureVO => {
  return {
    temperature: `${dto.temperature || 0}°${dto.unit || 'C'}`
  };
};

const url = ""; // 等待后端提供接口

export const getTemperature = async (): Promise<TemperatureVO> => {
  try {
    const res = await instance.get<TemperatureDTO>(url);
    return transformTemperature(res.data);
  } catch (error) {
    // 错误处理，返回默认值
    return {
      temperature: "20°C"
    };
  }
};


// // top.vue中的相关代码
// import { getTemperature } from "@/apis/getTemperature";

// // 在setup中
// const temperature = ref("20°C");

// // 获取温度数据
// const fetchTemperature = async () => {
//   const result = await getTemperature();
//   temperature.value = result.temperature;
// };
// 
// // 初始化时获取温度
// fetchTemperature();

// // 可以设置定时更新温度
// setInterval(fetchTemperature, 300000); // 每5分钟更新一次