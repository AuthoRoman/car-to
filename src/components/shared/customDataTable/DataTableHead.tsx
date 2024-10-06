import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { CARS_IN_WAITING_ITEMS } from "../../../pages/CarsWaitings/constants/carsInWaitingItems";
import TableCellWithSort from "./TableCellWithSort";

import { SortState } from "./DataTable";

import { CARS_SERVICE_ITEMS } from "../../../pages/CarsService/constants/carsServiceItems";
import { CARS_FINISH_ITEMS } from "../../../pages/CarFinish/constants/carsFinishItems";
import { ICar } from "../../../pages/CarsWaitings/types";
import { cardFinish } from "../../../pages/CarFinish/types";
import { cardService } from "../../../pages/CarsService/types";
import { useTranslation } from "react-i18next";
import {
  getLocaleCarInfo,
  localCarInfo,
} from "../../../core/utils/localeInfoCar";

interface IDataTableRowProps<T> {
  handlerChangeDefaultState: (prop: keyof SortState<T>) => void;
  sortState: SortState<T>;
  upStateSort: boolean;
  typeCar: string;
}

const DataTableHead = <T extends ICar | cardService | cardFinish>({
  typeCar,
  handlerChangeDefaultState,
  sortState,
  upStateSort,
}: IDataTableRowProps<T>) => {
  const { t } = useTranslation("translation");
  return (
    <TableHead>
      <TableRow>
        {typeCar == "ICar" &&
          CARS_IN_WAITING_ITEMS.map((car, index) => (
            <TableCellWithSort
              key={index}
              title={t(
                getLocaleCarInfo(car.title as keyof typeof localCarInfo),
              )}
              state={
                sortState[car.defaultName as keyof SortState<T>] as boolean
              }
              arrowState={upStateSort}
              onClick={() =>
                handlerChangeDefaultState(car.defaultName as keyof SortState<T>)
              }
            />
          ))}
        {typeCar == "cardService" &&
          CARS_SERVICE_ITEMS.map((car, index) => (
            <TableCellWithSort
              key={index}
              title={t(
                getLocaleCarInfo(car.title as keyof typeof localCarInfo),
              )}
              state={
                sortState[car.defaultName as keyof SortState<T>] as boolean
              }
              arrowState={upStateSort}
              onClick={() =>
                handlerChangeDefaultState(car.defaultName as keyof SortState<T>)
              }
            />
          ))}
        {typeCar == "cardFinish" &&
          CARS_FINISH_ITEMS.map((car, index) => (
            <TableCellWithSort
              key={index}
              title={t(
                getLocaleCarInfo(car.title as keyof typeof localCarInfo),
              )}
              state={
                sortState[car.defaultName as keyof SortState<T>] as boolean
              }
              arrowState={upStateSort}
              onClick={() =>
                handlerChangeDefaultState(car.defaultName as keyof SortState<T>)
              }
            />
          ))}
        <TableCell align="center">{t("actions")}</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DataTableHead;
