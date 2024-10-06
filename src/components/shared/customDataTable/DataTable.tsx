import React from "react";
import DataTableContainer from "./DataTableContainter";
import { Table, TableBody, TableRow } from "@mui/material";
import DataTableHead from "./DataTableHead";
import { SortStateTypeWaitingCars } from "../../../pages/CarsWaitings/hooks/CarListWaitingHook";

import { SortStateType } from "../../../pages/CarsService/hooks/CarServiceHook";
import { SortStateTypeFinishCars } from "../../../pages/CarFinish/hooks/CarFinishHook";
import renderWaitingsCarTableRow from "./utils/renderWaitingsCarsCells";
import {
  DeleteButtonCarHandler,
  ICar,
  NextHandlerPop,
} from "../../../pages/CarsWaitings/types";
import {
  cardService,
  FunSetCurrentCar,
} from "../../../pages/CarsService/types";
import renderServiceCarsCells from "./utils/renderServiceCarsCells";
import {
  cardFinish,
  DeleteHandlerFinishCar,
} from "../../../pages/CarFinish/types";
import renderFinishCarsCells from "./utils/renderFinishCarsCells";
import { useTranslation } from "react-i18next";

export type SortState<T> =
  | (T extends ICar ? SortStateTypeWaitingCars : never)
  | (T extends cardFinish ? SortStateTypeFinishCars : never)
  | (T extends cardService ? SortStateType : never);

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
  const { t } = useTranslation<string>("translation");
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
                  t,
                )}
              {/**TAB 2 RENDER TABLE */}
              {"nameMaster" in car &&
                !("recomm" in car) &&
                funSetCurrentCar &&
                renderServiceCarsCells(car as cardService, funSetCurrentCar, t)}
              {/**TAB 3 RENDER TABLE */}
              {"recomm" in car &&
                deleteHandlerFinishCar &&
                renderFinishCarsCells(
                  car as cardFinish,
                  deleteHandlerFinishCar,
                  t,
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableContainer>
  );
};

export default DataTable;
