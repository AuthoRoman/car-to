import React from "react";
import DataTableContainer from "./DataTableContainter";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import DataTableHead from "./DataTableHead";
import { SortStateTypeWaitingCars } from "../../pages/CarsWaitings/CarListWaitingHook";
import { ICar } from "../../state/types";

interface DataTableProps {
  handlerChangeDefaultState: (prop: keyof SortStateTypeWaitingCars) => void;
  filteredCars: ICar[];
  sortState: SortStateTypeWaitingCars;
  upStateSort: boolean;
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

const DataTable: React.FC<DataTableProps> = ({
  handleServicePop,
  deleteCar,
  getInfocar,
  filteredCars,
  handlerChangeDefaultState,
  sortState,
  upStateSort,
}) => {
  return (
    <DataTableContainer>
      <Table sx={{ minWidth: 100, width: "100%" }} aria-label="simple table">
        <DataTableHead
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
              <TableCell align="center" component="th" scope="row">
                {car.firstNameOwner} {car.secondNameOwner}
              </TableCell>
              <TableCell align="center">{car.email} </TableCell>
              <TableCell align="center">{car.carNumber}</TableCell>
              <TableCell align="center">{car.date}</TableCell>
              <TableCell align="center">
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={(event) => deleteCar(event, car)}
                    color="warning"
                  >
                    Удалить
                  </Button>
                  <Button
                    onClick={(event) => handleServicePop(event, car.VIN, car)}
                    sx={{
                      backgroundColor: "var(--default-color-button)",
                      transition: "var(--default-transition)",
                      "&:hover": {
                        background: "var(--default-color-button-hover)",
                      },
                    }}
                    variant="contained"
                  >
                    Отправить на обслуживание
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableContainer>
  );
};

export default DataTable;
