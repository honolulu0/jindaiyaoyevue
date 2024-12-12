import { BehaviorSubject } from "rxjs";

interface ModelSubjectCloseType {
  isShow: false;
  content: "";
}

interface ModelSubjectOpenType {
  isShow: true;
  content: "defenseDeploymentSuccess" | "partyBuildActivity";
}

type ModelSubjectType = ModelSubjectCloseType | ModelSubjectOpenType;

export const modelSubject = new BehaviorSubject<ModelSubjectType>({
  isShow: false,
  content: "",
});

export const parkingSubject = new BehaviorSubject<boolean>(false);

export const topTabsSubject = new BehaviorSubject<number>(0);
