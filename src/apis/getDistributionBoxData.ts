import axiosInstance from "./axios";

export interface IDistributionBoxData {
  status?: string;
  data: {
    "设备类型": string;
    "设备编号": string;
    "位置": string;
    "数据读取时间": string;
    "A相电压": string;
    "B相电压": string;
    "C相电压": string;
    "A相电流": string;
    "B相电流": string;
    "C相电流": string;
    "状态": string;
    "正向电量": string;
  }[];
}

export const getDistributionBoxData = async () => {
  let res: IDistributionBoxData;
  res = await axiosInstance.get("/park_api/device/get_shuidian_shishi?device_types=1%2C2") as unknown as IDistributionBoxData;
  while (res?.status === "查询设备时发生错误") {
    await new Promise(resolve => setTimeout(resolve, 1000));
    res = await axiosInstance.get("/park_api/device/get_shuidian_shishi?device_types=1%2C2") as unknown as IDistributionBoxData;
  }
  return res.data.filter((item) => item["设备类型"] === "电表");
};
