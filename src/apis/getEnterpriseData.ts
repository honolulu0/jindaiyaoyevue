import { jindai3adminInstance } from "./axios";

export interface Enterprise {
  id: string;
  name: string;
  type: 'FINANCE' | 'TECHNOLOGY' | 'INDUSTRY' | 'SERVICE' | 'OTHER';
  scale: 'SMALL' | 'NORMAL' | 'OTHER';
  isStar: boolean;
  createdAt: string;
  updatedAt: string;
  imgUrl: string;
  description: string;
}

export const getEnterpriseData = async () => {
  const res = await jindai3adminInstance.get<Enterprise[]>("/parkEnterprise/all");
  return res.data;
};