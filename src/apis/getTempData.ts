import axiosInstance from "./axios";

export interface ITempResponse {
  device_id: number;
  location: string;
  meter_info: {
    "温度(℃)": string;
    "湿度(%RH)": string;
    "湿度（%RH）": string;
    "温度（℃）": string;
  };
}

export const getTempData = async () => {
  const res = await axiosInstance.get("/park_api/device/wenshidu_shishi") as unknown as ITempResponse[];
  console.log(res);
  return res;
};
