import { jindai3adminInstance } from "./axios";

export interface RepairRateData {
  id: string;
  rate: string;
  score: string;
  createdAt: string;
  updatedAt: string;
}

export const getRepairRateData = async () => {
  const res = await jindai3adminInstance.get<RepairRateData[]>("/repairScore/all");
  return {
    rate: res.data[0].rate,
    score: res.data[0].score,
  };
};
