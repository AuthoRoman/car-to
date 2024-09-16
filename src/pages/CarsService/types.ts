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
  date?: string;
}

export type FunSetCurrentCar = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  car: cardService,
) => void;
