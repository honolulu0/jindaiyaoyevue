import axiosInstance from "./axios";

interface ParkingData {
  "状态统计": {
    "空闲车位": number;
    "占用车位": number;
    "故障车位": number;
    "总车位数": number;
  };
}

export const getParkingData = async (): Promise<ParkingData["状态统计"]> => {
  const res = await axiosInstance.get("/park_api/device/tingchewei/getAllSpaceStatus") as any;
  return res["状态统计"] ;
};
