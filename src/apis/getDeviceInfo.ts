import axiosInstance from "./axios";

export const getDeviceInfo = async (deviceId: string) => {
  const res = await axiosInstance.get(`/park_api/device/device_data`, {
    params: {
      device_names: deviceId,
    },
  });

  return res.data;
};
