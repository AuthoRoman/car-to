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

export enum localInRussianInfo {
  firstNameOwner = "Имя владельца",
  secondNameOwner = "Фамилия владельца",
  tel = "Номер телефона владельца",
  numberOwners = "Количество владельцев автомобиля",
  carNumber = "Номер автомобиля",
  date = "Машина заявлена на обслуживание",
  email = "Электронная почта владельца",
  VIN = "ВИН номер автомобиля",
  accidents = "Аварии автомобиля",
  carMileage = "Автомобиль с пробегом",
  registration = " Автомобиль зарегистрирован",
  checkDigit = "Номер контрольный автомобиля",
  country = "Автомобиль собран в стране",
  color = "Цвет автомобиля",
  serialNumber = "Сирийный номер автомобиля",
  region = "Регион сборки",
  assemblyPlant = "Сборочный завод",
  accidentse = "Марка автомобиля",
  modelYear = "Год выпуска авто",
  nameMaster = "Имя мастера, который отремонтировал авто",
  vehicleAttributes = "Атрибуты транспортного средства",
  problems = "Проблемы автомобиля",
  workOncar = "Работы, которые были проведены",
  recomm = "Рекомендации",
}
export type LocalInRussianKeys = keyof typeof localInRussianInfo;

//GloablStateTypes
export interface ICarsState<T> {
  cars: T[];
  filteredItems: T[];
}

export interface IAction<T> {
  type: string;
  payload?: T;
}
//////
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

////Service

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

////Finish
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
