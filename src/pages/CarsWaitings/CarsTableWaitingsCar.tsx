// Компонент для отображения таблицы автомобилей

import { SortStateTypeWaitingCars } from "./CarListWaitingHook";
import { ICar } from "../../state/types";
import DataTable from "../../components/customDataTable/DataTable";

interface ICarTableProps {
  filteredCars: ICar[];
  sortState: SortStateTypeWaitingCars;
  upStateSort: boolean;
  handlerChangeDefaultState: (prop: keyof SortStateTypeWaitingCars) => void;
  getInfocar: (car: ICar) => void;
  deleteCar: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    car: ICar,
  ) => void;
  handleServicePop: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    VIN: string,
    car: ICar,
  ) => void;
}

export const CarsTable = (props: ICarTableProps) => {
  return (
    <div style={{ display: "flex" }}>
      <DataTable {...props} />
    </div>
  );
};
