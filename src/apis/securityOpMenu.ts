import axiosInstance from "./axios";

export const riqinbaojingBufang = () => {
  return axiosInstance.get("park_api/device/riqinbaojing/bufang");
};

export const riqinbaojingChefang = () => {
  return axiosInstance.get("park_api/device/riqinbaojing/chefang");
};

export const dianziweilanBufang = () => {
  return axiosInstance.get("park_api/device/dianziweilan/bufang");
};

export const dianziweilanChefang = () => {
  return axiosInstance.get("park_api/device/dianziweilan/chefang");
};
