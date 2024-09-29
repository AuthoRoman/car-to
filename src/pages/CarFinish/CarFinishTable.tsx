import React from "react";

import { SortStateTypeFinishCars } from "./hooks/CarFinishHook";

import DataTable from "../../components/customDataTable/DataTable";
import { cardFinish, DeleteHandlerFinishCar } from "./types";

interface ICarFinishTable {
  filteredCars: cardFinish[];
  sortState: SortStateTypeFinishCars;
  upStateSort: boolean;
  handlerChangeDefaultState: (prop: keyof SortStateTypeFinishCars) => void;
  getInfo: (car: cardFinish) => void;
  deleteHandlerFinish: DeleteHandlerFinishCar;
}

const CarFinishTable = (props: ICarFinishTable) => {
  const {
    sortState,

    getInfo,
    deleteHandlerFinish: deleteHandler,
  } = props;
  return (
    <DataTable<cardFinish>
      typeCar="cardFinish"
      getInfocar={getInfo}
      deleteHandlerFinishCar={deleteHandler}
      {...props}
      sortState={sortState}
    />
  );
};

export default CarFinishTable;
