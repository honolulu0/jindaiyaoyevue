import axiosInstance from "./axios";

export interface ServiceType {
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
  document_number: any;
  publish_date: string;
  creator: number;
  category: number;
}

export const getServices = async () => {
  const res = await axiosInstance.get("/api/system/article/get_by_category/", {
    params: {
      category_name: "服务类型",
    },
  });
  return res.data.data;
};