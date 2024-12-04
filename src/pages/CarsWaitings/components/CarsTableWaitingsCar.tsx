import { SortStateTypeWaitingCars } from "../hooks/CarListWaitingHook";

import DataTable from "../../../components/shared/customDataTable/DataTable";
import { DeleteButtonCarHandler, ICar } from "../types";

interface ICarTableProps {
  filteredCars: ICar[];
  sortState: SortStateTypeWaitingCars;
  upStateSort: boolean;
  handlerChangeDefaultState: (prop: keyof SortStateTypeWaitingCars) => void;
  getInfocar: (car: ICar) => void;
  deleteCar: DeleteButtonCarHandler;
  handleServicePop: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    VIN: string,
    car: ICar,
  ) => void;
}

export const CarsTable = (props: ICarTableProps) => {
  return (
    <div style={{ display: "flex" }}>
      <DataTable<ICar>
        {...props}
        deleteHandler={props.deleteCar}
        typeCar={"ICar"}
      />
    </div>
  );
};
