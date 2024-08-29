import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { CARS_IN_WAITING_ITEMS } from "./constants/carsInWaitingItems";
import TableCellWithSort from "./TableCellWithSort";
import { SortStateTypeWaitingCars } from "../../pages/CarsWaitings/CarListWaitingHook";

interface IDataTableRowProps {
  handlerChangeDefaultState: (prop: keyof SortStateTypeWaitingCars) => void;
  sortState: SortStateTypeWaitingCars;
  upStateSort: boolean;
}

const DataTableHead: React.FC<IDataTableRowProps> = ({
  handlerChangeDefaultState,
  sortState,
  upStateSort,
}) => {
  return (
    <TableHead>
      <TableRow>
        {CARS_IN_WAITING_ITEMS.map((car) => (
          <TableCellWithSort
            title={car.title}
            state={sortState[car.defaultName as keyof SortStateTypeWaitingCars]}
            arrowState={upStateSort}
            onClick={() =>
              handlerChangeDefaultState(
                car.defaultName as keyof SortStateTypeWaitingCars,
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
