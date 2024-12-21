import axiosInstance from "./axios";

export interface PolicyData {
  id: number;
  modifier_name: string;
  dept_belong_id: any;
  creator_name: string;
  create_datetime: string;
  update_datetime: string;
  category_name: string;
  cover_url: any;
  description: any;
  modifier: string;
  title: string;
  cover: any;
  content: string;
  sort: number;
  status: boolean;
  issuing_authority: string;
  document_number: string;
  publish_date: string;
  creator: number;
  category: number;
}

export interface PolicyResponse {
  data: {
    data: PolicyData[];
  },
  total: number;
}

export const getPolicy = async () => {
  const res1 = await axiosInstance.get<PolicyResponse>(`/api/system/article/get_by_category`,{
    params: {
      category_name: "市区政策",
      limit: 10,
    },
  }) as any;
  const res2 = await axiosInstance.get<PolicyResponse>(`/api/system/article/get_by_category`,{
    params: {
      category_name: "省级政策",
      limit: 10,
    },
  }) as any;
  const res3 = await axiosInstance.get<PolicyResponse>(`/api/system/article/get_by_category`,{
    params: {
      category_name: "其他政策",
      limit: 10,
    },
  }) as any;
  console.log(res1.data, res2.data, res3.data);
  return {
    city: {
      data: res1.data.data as PolicyData[],
      total: res1.total,
    },
    province: {
      data: res2.data.data as PolicyData[],
      total: res2.total,
    },
    other: {
      data: res3.data.data as PolicyData[],
      total: res3.total,
    },
    total: res1.total + res2.total + res3.total,
  };
};
