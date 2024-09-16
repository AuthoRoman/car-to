import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { CARS_IN_WAITING_ITEMS } from "./constants/carsInWaitingItems";
import TableCellWithSort from "./TableCellWithSort";

import { SortState } from "./DataTable";

import { CARS_SERVICE_ITEMS } from "./constants/carsServiceItems";
import { CARS_FINISH_ITEMS } from "./constants/carsFinishItems";
import { ICar } from "../../pages/CarsWaitings/types";
import { cardFinish } from "../../pages/CarFinish/types";
import { cardService } from "../../pages/CarsService/types";

interface IDataTableRowProps<T> {
  handlerChangeDefaultState: (prop: keyof SortState<T>) => void;
  sortState: SortState<T>;
  upStateSort: boolean;
  typeCar: string;
}

const DataTableHead = <T,>({
  typeCar,
  handlerChangeDefaultState,
  sortState,
  upStateSort,
}: IDataTableRowProps<
  T extends ICar ? ICar : T extends cardFinish ? cardFinish : cardService
>) => {
  return (
    <TableHead>
      <TableRow>
        {typeCar == "ICar" &&
          CARS_IN_WAITING_ITEMS.map((car, index) => (
            <TableCellWithSort
              key={index}
              title={car.title}
              state={
                sortState[
                  car.defaultName as keyof SortState<
                    T extends ICar
                      ? ICar
                      : T extends cardFinish
                        ? cardFinish
                        : cardService
                  >
                ] as boolean
              }
              arrowState={upStateSort}
              onClick={() =>
                handlerChangeDefaultState(
                  car.defaultName as keyof SortState<
                    T extends ICar
                      ? ICar
                      : T extends cardFinish
                        ? cardFinish
                        : cardService
                  >,
                )
              }
            />
          ))}
        {typeCar == "cardService" &&
          CARS_SERVICE_ITEMS.map((car, index) => (
            <TableCellWithSort
              key={index}
              title={car.title}
              state={
                sortState[
                  car.defaultName as keyof SortState<
                    T extends ICar
                      ? ICar
                      : T extends cardFinish
                        ? cardFinish
                        : cardService
                  >
                ] as boolean
              }
              arrowState={upStateSort}
              onClick={() =>
                handlerChangeDefaultState(
                  car.defaultName as keyof SortState<
                    T extends ICar
                      ? ICar
                      : T extends cardFinish
                        ? cardFinish
                        : cardService
                  >,
                )
              }
            />
          ))}
        {typeCar == "cardFinish" &&
          CARS_FINISH_ITEMS.map((car, index) => (
            <TableCellWithSort
              key={index}
              title={car.title}
              state={
                sortState[
                  car.defaultName as keyof SortState<
                    T extends ICar
                      ? ICar
                      : T extends cardFinish
                        ? cardFinish
                        : cardService
                  >
                ] as boolean
              }
              arrowState={upStateSort}
              onClick={() =>
                handlerChangeDefaultState(
                  car.defaultName as keyof SortState<
                    T extends ICar
                      ? ICar
                      : T extends cardFinish
                        ? cardFinish
                        : cardService
                  >,
                )
              }
            />
          ))}
        <TableCell align="center">Действие </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DataTableHead;
