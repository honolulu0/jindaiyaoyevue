import axiosInstance from "./axios";

export interface ErrorAlert {
  id: string;
  device_name: string;
  location: string;
  device_type: string;
  device_type_name: string;
  msg_content: string;
  create_time: string;
  is_processed: number;
}

export const getErrorAlert = async (params: {
  device_type?: string;
	page: number;
	pageSize: number;
}): Promise<ErrorAlert[]> => {
  const res = await axiosInstance.get<any>("/park_api/alerts", {
    params: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 10000,
      device_type: params.device_type ?? "",
    },
  });
  return res.data.items;
};

export const getErrorAlertDetail = (id: string) => {
  return axiosInstance.get(`/park_api/alerts/${id}`);
};
