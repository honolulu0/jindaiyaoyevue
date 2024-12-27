import axiosInstance from "./axios";

export interface IConsumptionData {
  data: {
    "水表": Record<string, number>;
    "电表": Record<string, number>;
  };
}

// 获取能耗数据
export const getConsumptionData = async () => {
  const res = await axiosInstance.get("/park_api/device/shuidian_anyue_qushi") as unknown as IConsumptionData;
  console.log(res.data);
  return res.data;
};