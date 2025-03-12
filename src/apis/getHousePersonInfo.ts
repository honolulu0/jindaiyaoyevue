import { jindai3adminInstance } from "./axios";

export interface HousePersonInfoNoRelation {
	id: string;

	name: string;

	sex: string;

	age: string;

	building: string;

	floor: string;

	room: string;

	rentStartAt?: Date | null;

	rentEndAt?: Date | null;

	phone?: string | null;

	imgUrl?: string | null;


	isPartyMember: boolean;


	description?: string | null;


	isHighAge: boolean;


	createdAt: Date;


	updatedAt: Date;


	housePictureId: string;
}

export interface Stats {
	persons: number;

	isPartyMember: number;

	isHighAge: number;

	room: number;
}

export interface HousePicture {
	imgUrl: string;
}

export interface Rooms {
	roomName: string;

	persons: (HousePersonInfoNoRelation & {
		housePicture: HousePicture | null;
	})[];
}

export interface Floors {
	floorName: string;

	rooms: Rooms[];
}

export interface Building {
	buildingName: string;

	stats: Stats;

	floors: Floors[];
}

export interface BuildingResponse {
  code: number;

  message: string;

  data: Building;

}

export const getHousePersonInfo = async (building: string) => {
  const res = await jindai3adminInstance.get(
    "/housePersonInfo/buildInfo",
    {
      params: {
        building,
      },
    }
  );
  return res as unknown as BuildingResponse;
};
