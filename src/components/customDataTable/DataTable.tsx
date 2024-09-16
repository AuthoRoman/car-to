import React from "react";
import DataTableContainer from "./DataTableContainter";
import { Table, TableBody, TableRow } from "@mui/material";
import DataTableHead from "./DataTableHead";
import { SortStateTypeWaitingCars } from "../../pages/CarsWaitings/CarListWaitingHook";

import { SortStateType } from "../../pages/CarsService/CarService";
import { SortStateTypeFinishCars } from "../../pages/CarFinish/CarFinishHook";
import renderWaitingsCarTableRow from "./utils/renderWaitingsCarsCells";
import {
  DeleteButtonCarHandler,
  ICar,
  NextHandlerPop,
} from "../../pages/CarsWaitings/types";
import { cardService, FunSetCurrentCar } from "../../pages/CarsService/types";
import renderServiceCarsCells from "./utils/renderServiceCarsCells";
import {
  cardFinish,
  DeleteHandlerFinishCar,
} from "../../pages/CarFinish/types";
import renderFinishCarsCells from "./utils/renderFinishCarsCells";

export type SortState<T> = T extends ICar
  ? SortStateTypeWaitingCars
  : T extends cardFinish
    ? SortStateTypeFinishCars
    : T extends cardService
      ? SortStateType
      : never;

interface DataTableProps<T> {
  filteredCars: T[];
  sortState: SortState<T>;
  upStateSort: boolean;
  handlerChangeDefaultState: (prop: keyof SortState<T>) => void;
  getInfocar: (car: T) => void;

  handleServicePop?: NextHandlerPop;
  funSetCurrentCar?: FunSetCurrentCar;
  deleteHandler?: DeleteButtonCarHandler;
  deleteHandlerFinishCar?: DeleteHandlerFinishCar;
  typeCar: "ICar" | "cardService" | "cardFinish";
}

const DataTable = <T extends object>({
  typeCar,
  handleServicePop,

  getInfocar,
  filteredCars,
  handlerChangeDefaultState,
  sortState,
  upStateSort,
  funSetCurrentCar,
  deleteHandler,
  deleteHandlerFinishCar,
}: DataTableProps<
  T extends ICar ? ICar : T extends cardFinish ? cardFinish : cardService
>) => {
  return (
    <DataTableContainer>
      <Table sx={{ minWidth: 100, width: "100%" }} aria-label="simple table">
        <DataTableHead<T>
          typeCar={typeCar}
          sortState={sortState}
          upStateSort={upStateSort}
          handlerChangeDefaultState={handlerChangeDefaultState}
        />

        <TableBody>
          {filteredCars?.map((car) => (
            <TableRow
              onClick={() => getInfocar(car)}
              key={car.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { cursor: "pointer" },
              }}
            >
              {/**TAB 1 RENDER TABLE */}
              {"firstNameOwner" in car &&
                renderWaitingsCarTableRow(
                  car as ICar,
                  deleteHandler as DeleteButtonCarHandler,
                  handleServicePop as NextHandlerPop,
                )}
              {/**TAB 2 RENDER TABLE */}
              {"nameMaster" in car &&
                !("recomm" in car) &&
                funSetCurrentCar &&
                renderServiceCarsCells(car as cardService, funSetCurrentCar)}
              {/**TAB 3 RENDER TABLE */}
              {"recomm" in car &&
                deleteHandlerFinishCar &&
                renderFinishCarsCells(car, deleteHandlerFinishCar)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableContainer>
  );
};

export default DataTable;
