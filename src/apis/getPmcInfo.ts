import { jindai3adminInstance } from "./axios";

export interface PmcInfoType {
  id: string;
  name: string;
  yearEstablished: string;
  employeeCount: string;
  managementFeeStartAt: string;
  managementFeeEndAt: string;
  description: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
}



export const getPmcInfo = async () => {
  const res = await jindai3adminInstance.get(`pmcInfo/all`);
  return res.data[0] as PmcInfoType;
};