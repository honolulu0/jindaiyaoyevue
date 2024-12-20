import { jindai3adminInstance } from "./axios";

interface AreaMonitoringData {
  id: number;
  name: string;
  url: string;
}

export const getAreaMonitoringData = () => {
  return jindai3adminInstance.get<AreaMonitoringData[]>("/areaMonitoring/all");
};

