import { jindai3adminInstance } from "./axios";

export interface HousePic {
  id: string;
  name: string;
  imgUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const getHousePic = async () => {
  const res = await jindai3adminInstance.get<HousePic[]>("/housePicture/all");
  return res.data;
};