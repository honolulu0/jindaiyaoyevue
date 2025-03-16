import { jindai3adminInstance } from "./axios";

export const getParkEnterpriseRentInfo = async (building: string) => {
  const res = await jindai3adminInstance.get("parkEnterpriseRentInfo/ui", {
    params: { name: building },
  });
  return res as any;
};
