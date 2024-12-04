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
  color?: string;
  carMileage?: string;
  carNumber: string;
  registration?: string;
  accidents?: string;
  date?: string;
  problems?: string;
}

export type DeleteButtonCarHandler = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  car: ICar,
) => void;

export type NextHandlerPop = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  VIN: string,
  car: ICar,
) => void;
