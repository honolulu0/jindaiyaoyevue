
import { jindai3adminInstance } from "./axios";

export interface ParkInfoType {
  id: string;
  name: string;
  yearOfFinishBuilding: string;
  location: string;
  rentPriceStartAt: string;
  rentPriceEndAt: string;
  sellPriceStartAt: string;
  sellPriceEndAt: string;
  totalUnit: string;
  totalBuildingArea: string;
  description: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const getParkInfo = async () => {
  const res = await jindai3adminInstance.get(`parkInfo/all`);
  return res.data[0];
};
