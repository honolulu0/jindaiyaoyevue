import { jindai3adminInstance } from "./axios";

interface PartyMemberDTO {
  id: string;
  name: string;
  partyMembers: object[];
}

export const getTop5PartyData = async () => {
  const res = await jindai3adminInstance.get<PartyMemberDTO[]>("partyBranch/top5");
  return res.data;
};
