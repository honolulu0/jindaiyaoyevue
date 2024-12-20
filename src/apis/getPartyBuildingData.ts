import { jindai3adminInstance } from "./axios";

export const getPartyBuildingData = async () => {
  const res = await jindai3adminInstance.get<Record<"total", number>>(
    "/partyBranch/list?pageSize=10&page=1"
  );
  const res2 = await jindai3adminInstance.get<Record<"isOfficial", boolean>[]>(
    "/partyMember/all"
  );
  return {
    totalMemberBranch: res.data.total,
    totalMember: res2.data.length,
    isOfficial: res2.data.filter((item) => item.isOfficial).length,
    unOfficial: res2.data.filter((item) => !item.isOfficial).length,
  };
};
