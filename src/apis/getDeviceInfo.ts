import axiosInstance from "./axios";

export const getDeviceInfo = async (deviceId: string) => {
  const res = await axiosInstance.get(`/park_api/device/device_data`, {
    params: {
      device_id: deviceId,
    },
  });

  return res.data;
};
