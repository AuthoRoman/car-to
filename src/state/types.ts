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

 
 
export enum localInRussian {
  engine = "Двигатель",
  fuses = "Предохранители",
  catalyst = "Катализатор",
  generator = "Генератор",
  brakeSystem = "Тормозная система",
  windshieldWashers = "Омыватели лобового стекла",
  alarm = "Аварийная сигнализация",
  steeringSystem = "Рулевая система",
}
export type LocalInRussianKeys = keyof typeof localInRussian;

export interface IPropsCar {
  nameOwner: string;
  tel: string;
  problems: string;
}
export interface ICar {
  id: number;
  VIN: string;
  tel: string;
  email: string;
  firstNameOwner: string;
  secondNameOwner: string;
  numberOwners: number;
  color: string;
  carMileage: string;
  carNumber: string;
  registration: string;
  accidents: string;
  date: string;
  problems: string;
}

export interface ICarsState {
  cars: ICar[]  ;
}

export interface IAction {
  type: string;
  payload: ICar  ;
}

export enum typesOfActionsCar {
  ADD_CAR = "ADD_CAR",
  EDIT_CAR = "EDIT_CAR",
  DELETE_CAR = "DELETE_CAR",
}

////Service

export enum serviceCarTypesAction {
  ADD_SERVICE_CAR = "ADD_SERVICE_CAR",
  DELETE_SERVICE_CAR = "DELETE_SERVICE_CAR",
}

export interface cardService {
  nameMaster: string;
  id: number;
  VIN: string;
  region: string;
  country: string;
  manufacturer: string;
  vehicleAttributes: string;
  checkDigit: string;
  modelYear: string;
  assemblyPlant: string;
  serialNumber: string;
  problems: string;
  date:string
}

export interface ICarserviceState {
  cars: cardService[];
}

export interface IServiceAction {
  type: string;
  payload: cardService;
}
////Finish 
export enum finishCarTypesAction {
  ADD_FINISH_CAR = "ADD_FINISH_CAR",
  DELETE_FINISH_CAR = 'DELETE_FINISH_CAR'
}

export interface cardFinish extends cardService {
  recomm: string,
  workOncar:string
}

export interface ICarFinishState {
  cars: cardFinish[];
}


export interface ICarFinishAction {
  type: string;
  payload: cardFinish;
}
///IndexedDB
export enum TypeBases{
  CARS_IN_WAITING = 'CARS_IN_WAITING',
  CARS_IN_SERVICE = 'CARS_IN_SERVICE',
  CARS_IN_FINISH = 'CARS_IN_FINISH',
}