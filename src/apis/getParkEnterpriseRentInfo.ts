import { jindai3adminInstance } from "./axios";

export const getParkEnterpriseRentInfo = async (building: string) => {
  const res = await jindai3adminInstance.get("parkEnterpriseRentInfo/ui", {
    params: { name: building },
  });
  return res as any;
};

export const getParkEnterpriseRentInfoByFloor = async (building: string, floor: string) => {
  const res = await jindai3adminInstance.get("parkEnterpriseRentInfo/uiBuildingByFloor", {
    params: { name: building, floor },
  });
  return res as any;
};
