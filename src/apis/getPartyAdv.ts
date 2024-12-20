import { jindai3adminInstance } from "./axios";

interface PartyAdvDTO {
  id: string;
  name: string;
  url: string;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getPartyAdv = async () => {
  const res = await jindai3adminInstance.get<PartyAdvDTO[]>("/partyAdvertisingVideo/all");
  return res.data.filter((item) => item.isShow)[0]?.url;
};
