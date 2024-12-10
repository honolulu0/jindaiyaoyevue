import { BehaviorSubject } from "rxjs";

interface ModelSubjectCloseType {
  isShow: false;
  content: "";
}

interface ModelSubjectOpenType {
  isShow: true;
  content: "defenseDeploymentSuccess";
}

type ModelSubjectType = ModelSubjectCloseType | ModelSubjectOpenType;

export const modelSubject = new BehaviorSubject<ModelSubjectType>({
  isShow: false,
  content: "",
});

export const parkingSubject = new BehaviorSubject<boolean>(false);
