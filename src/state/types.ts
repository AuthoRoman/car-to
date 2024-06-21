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

export interface IProblems {
  engine: boolean;
  fuses: boolean;
  catalyst: boolean;
  generator: boolean;
  brakeSystem: boolean;
  windshieldWashers: boolean;
  alarm: boolean;
  steeringSystem: boolean;
}
interface ICar {
  id: number;
  VIN: string;
  tel: string;
  email: string;
  firstNameOwner: string;
  secondNameOwner: string;
  numberOwners: number;
  color: string;
  carMileage: string;
  registration: string;
  accidents: string;

  problems: IProblems;
}

export interface ICarsState {
  cars: ICar[];
}

export interface IAction {
  type: string;
  payload: ICar;
}

export enum typesOfActionsCar {
  ADD_CAR = "ADD_CAR",
}

export interface IPropsCar {
  nameOwner: string;
  tel: string;
  problems: IProblems;
}
////Service

export enum serviceCarTypesAction{
  ADD_SERVICE_CAR = 'ADD_SERVICE_CAR'
}

interface cardService{
  nameMaster:string,
  id:number,
  VIN: string,
  region: string,
      country: string,
      manufacturer: string,
      vehicleAttributes: string,
      checkDigit: string,
      modelYear: string,
      assemblyPlant: string,
      serialNumber: string,
}

export interface ICarserviceState{
  cars: cardService[]
}

export interface IServiceAction {
  type: string;
  payload: cardService
}