import { jindai3adminInstance } from "./axios";

export interface PartyActivityData {
  id: number;
  title: string;
  imgUrl: string;
  description: string;
  createAt: string;
}

export const getPartyActivityData = async () => {
  const res = await jindai3adminInstance.get<PartyActivityData[]>(
    "/partyActivity/all"
  );
  return res.data;
};
