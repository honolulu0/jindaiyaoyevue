import axiosInstance from "./axios";

export const processError = async (id: string) => {
  try {
    await axiosInstance.put(`/park_api/alerts/${id}/process`, {
      is_processed: "1",
    });
    return true;
  } catch (error) {
    console.error("处理异常失败:", error);
    return false;
  }
};
