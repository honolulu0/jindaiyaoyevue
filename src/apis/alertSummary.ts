import axiosInstance from "./axios";

export const getAlertSummary = async () => {
  const thisYear = await axiosInstance.get("/park_api/alerts/alert_summary");
  const lastYear = await axiosInstance.get("/park_api/alerts/alert_summary", {
    params: {
      start_time: new Date().getFullYear() - 2,
      end_time: new Date().getFullYear() - 1
    }
  });
  return {
    thisYear: thisYear.data,
    lastYear: lastYear.data
  };
};
