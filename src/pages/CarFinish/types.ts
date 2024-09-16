import { cardService } from "../CarsService/types";

export interface cardFinish extends cardService {
  recomm: string;
  workOncar: string;
}

export type DeleteHandlerFinishCar = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  car: cardFinish,
) => void;
