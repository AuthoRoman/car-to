import React from "react";

import { SortStateTypeFinishCars } from "./CarFinishHook";
import { cardFinish } from "../../state/types";
import DataTable from "../../components/customDataTable/DataTable";

interface ICarFinishTable {
  filteredCars: cardFinish[];
  sortState: SortStateTypeFinishCars;
  upStateSort: boolean;
  handlerChangeDefaultState: (prop: keyof SortStateTypeFinishCars) => void;
  getInfo: (car: cardFinish) => void;
  deleteHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    car: cardFinish,
  ) => void;
}

const CarFinishTable = (props: ICarFinishTable) => {
  const {
    sortState,

    getInfo,
    deleteHandler,
  } = props;
  return (
    <DataTable<cardFinish>
      typeCar="cardFinish"
      getInfocar={getInfo}
      deleteCar={deleteHandler}
      {...props}
      sortState={sortState}
    />
  );
};

export default CarFinishTable;
