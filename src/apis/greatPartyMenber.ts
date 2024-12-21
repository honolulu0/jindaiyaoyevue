import { jindai3adminInstance } from "./axios";

export interface GreatPartyMemberDTO {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  isGreat: boolean;
  partyBranch: {
    name: string;
  };
}

export const getGreatPartyMember = async () => {
  const res = await jindai3adminInstance.get<GreatPartyMemberDTO[]>("/partyMember/all");
  return res.data.map((item) => ({
    ...item,
    img: item.imgUrl,
    unit: item.partyBranch.name,
  }));
};
