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
  employeesCount: number;
  registeredCapital: string;
  texPerYear: string;
  companyType: string;
  years: string;
  honors: string;
}

export const getEnterpriseData = async () => {
  const res = await jindai3adminInstance.get<Enterprise[]>("/parkEnterprise/all");
  return res.data;
};

export const getEnterpriseDataByName = async (name: string) => {
  const res = await jindai3adminInstance.get<{
    list: Enterprise[];
    total: number;
  }>(`/parkEnterprise/list`, {
    params: {
      name,
      page: 1,
      pageSize: 6,
    },
  });
  return res.data;
};

export const getEnterpriseDetail = async (id: string) => {
  const res = await jindai3adminInstance.get<Enterprise>(`/parkEnterprise/detail`, {
    params: {
      id,
    },
  });
  return res.data;
};
