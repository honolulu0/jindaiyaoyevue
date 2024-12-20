import axiosInstance from "./axios";

export interface ErrorAlert {
  id: string;
  device_name: string;
  location: string;
  device_type: string;
  device_type_name: string;
  msg_content: string;
  create_time: string;
  is_processed: boolean;
}

export const getErrorAlert = async (): Promise<ErrorAlert[]> => {
  const res = await axiosInstance.get<any>("/park_api/alerts", {
    params: {
      page: 1,
      pageSize: 10000,
    },
  });
  return res.data.items;
};

export const getErrorAlertDetail = (id: string) => {
  return axiosInstance.get(`/park_api/alerts/${id}`);
};