import { SortStateType } from "../hooks/CarServiceHook";
import DataTable from "../../../components/shared/customDataTable/DataTable";
import { cardService } from "../types";

interface ICarTableProps {
  filteredCars: cardService[];
  sortState: SortStateType;
  upStateSort: boolean;
  handlerChangeDefaultState: (prop: keyof SortStateType) => void;
  getInfoServiceCard: (car: cardService) => void;
  funSetCurrentCar: (
    event: React.FormEvent<EventTarget>,
    car: cardService,
  ) => void;
}

export const CarsTable = (props: ICarTableProps) => {
  const { getInfoServiceCard } = props;

  return (
    <DataTable<cardService>
      {...props}
      getInfocar={getInfoServiceCard}
      typeCar="cardService"
    />
  );
};
