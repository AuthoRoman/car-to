import { localCarInfo } from "../core/utils/localeInfoCar";
import { cardFinish } from "../pages/CarFinish/types";
import { cardService } from "../pages/CarsService/types";
import { ICar } from "../pages/CarsWaitings/types";

export type Color =
  | "red"
  | "blue"
  | "grey"
  | "yellow"
  | "pink"
  | "purple"
  | "black"
  | "white"
  | "orange";

export type LocalInRussianKeys = keyof typeof localCarInfo;

export interface ICarsState<T> {
  cars: T[];
  filteredItems: T[];
}

export interface IAction<T> {
  type: string;
  payload?: T;
}

export enum typesOfActionsCar {
  ADD_CAR = "ADD_CAR",
  EDIT_CAR = "EDIT_CAR",
  FIND_CAR = "FIND_CAR",
  SORT_CAR_FIRSTNAMEOWNER_UP = "SORT_CAR_FIRSTNAMEOWNER_UP",
  SORT_CAR_EMAIL_UP = "SORT_CAR_EMAIL_UP",
  SORT_CAR_NUMBERAUTO_UP = "SORT_CAR_NUMBERAUTO_UP",
  SORT_CAR_TIME_UP = "SORT_CAR_TIME_UP",
  SORT_CAR_FIRSTNAMEOWNER_DOWN = "SORT_CAR_FIRSTNAMEOWNER_DOWN",
  SORT_CAR_EMAIL_DOWN = "SORT_CAR_EMAIL_DOWN",
  SORT_CAR_NUMBERAUTO_DOWN = "SORT_CAR_NUMBERAUTO_DOWN",
  SORT_CAR_TIME_DOWN = "SORT_CAR_TIME_DOWN",
  DELETE_CAR = "DELETE_CAR",
}

export enum serviceCarTypesAction {
  SORT_SERVICE_CAR_CAR_NAME_MASTER_UP = "SORT_SERVICE_CAR_CAR_NAME_MASTER_UP",
  SORT_SERVICE_CAR_CAR_MANUFACTURER_UP = "SORT_SERVICE_CAR_CAR_MANUFACTURER_UP",
  SORT_SERVICE_CAR_CAR_MODEL_YEAR_UP = "SORT_SERVICE_CAR_CAR_MODEL_YEAR_UP",
  SORT_SERVICE_CAR_CAR_DATE_UP = "SORT_SERVICE_CAR_CAR_DATE_UP",
  SORT_SERVICE_CAR_CAR_NAME_MASTER_DOWN = "SORT_SERVICE_CAR_CAR_NAME_MASTER_DOWN",
  SORT_SERVICE_CAR_CAR_MANUFACTURER_DOWN = "SORT_SERVICE_CAR_CAR_MANUFACTURER_DOWN",
  SORT_SERVICE_CAR_CAR_MODEL_YEAR_DOWN = "SORT_SERVICE_CAR_CAR_MODEL_YEAR_DOWN",
  SORT_SERVICE_CAR_CAR_DATE_DOWN = "SORT_SERVICE_CAR_CAR_DATE_DOWN",
  ADD_SERVICE_CAR = "ADD_SERVICE_CAR",
  FIND_SERVICE_CAR = "FIND_SERVICE_CAR",
  DELETE_SERVICE_CAR = "DELETE_SERVICE_CAR",
}

export enum finishCarTypesAction {
  ADD_FINISH_CAR = "ADD_FINISH_CAR",
  FIND_FINISH_CAR = "FIND_FINISH_CAR",
  SORT_FINISH_CAR_CAR_NAME_MASTER_UP = "SORT_FINISH_CAR_CAR_NAME_MASTER_UP",
  SORT_FINISH_CAR_CAR_MANUFACTURER_UP = "SORT_FINISH_CAR_CAR_MANUFACTURER_UP",
  SORT_FINISH_CAR_CAR_MODEL_YEAR_UP = "SORT_FINISH_CAR_CAR_MODEL_YEAR_UP",
  SORT_FINISH_CAR_CAR_WORK_UP = "SORT_FINISH_CAR_CAR_WORK_UP",
  SORT_FINISH_CAR_CAR_NAME_MASTER_DOWN = "SORT_FINISH_CAR_CAR_NAME_MASTER_DOWN",
  SORT_FINISH_CAR_CAR_MANUFACTURER_DOWN = "SORT_FINISH_CAR_CAR_MANUFACTURER_DOWN",
  SORT_FINISH_CAR_CAR_MODEL_YEAR_DOWN = "SORT_FINISH_CAR_CAR_MODEL_YEAR_DOWN",
  SORT_FINISH_CAR_CAR_WORK_DOWN = "SORT_FINISH_CAR_CAR_WORK_DOWN",
  DELETE_FINISH_CAR = "DELETE_FINISH_CAR",
}

export type UnificatorPropsInfoCar = Partial<ICar & cardService & cardFinish>;
