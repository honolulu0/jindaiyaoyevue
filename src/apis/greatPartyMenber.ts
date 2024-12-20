import { jindai3adminInstance } from "./axios";

export interface GreatPartyMemberDTO {
  id: string;
  name: string;
  unit: string;
  description: string;
  imgUrl: string;
}

export const getGreatPartyMember = async () => {
  const res = await jindai3adminInstance.get<GreatPartyMemberDTO[]>("/partyMember/all");
  return res.data.map((item) => ({
    ...item,
    img: item.imgUrl,
  }));
};
