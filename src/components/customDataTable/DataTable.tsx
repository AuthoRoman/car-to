import React from "react";
import DataTableContainer from "./DataTableContainter";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import DataTableHead from "./DataTableHead";
import { SortStateTypeWaitingCars } from "../../pages/CarsWaitings/CarListWaitingHook";
import { cardFinish, cardService, ICar } from "../../state/types";
import { SortStateType } from "../../pages/CarsService/CarService";
import { SortStateTypeFinishCars } from "../../pages/CarFinish/CarFinishHook";

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
  deleteCar?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    car: T,
  ) => void;
  handleServicePop?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    VIN: string,
    car: T,
  ) => void;
  funSetCurrentCar?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,

    car: T,
  ) => void;
  deleteHandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    car: T,
  ) => void;
  typeCar: "ICar" | "cardService" | "cardFinish";
}

const DataTable = <T extends object>({
  typeCar,
  handleServicePop,
  deleteCar,
  getInfocar,
  filteredCars,
  handlerChangeDefaultState,
  sortState,
  upStateSort,
  funSetCurrentCar,
  deleteHandler,
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
              {"firstNameOwner" in car && (
                <>
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
                        onClick={(event) => deleteCar?.(event, car)}
                        color="warning"
                      >
                        Удалить
                      </Button>
                      <Button
                        onClick={(event) =>
                          handleServicePop?.(event, car.VIN, car)
                        }
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
                </>
              )}
              {"nameMaster" in car && !("recomm" in car) && (
                <>
                  <TableCell align="center">{car.nameMaster}</TableCell>
                  <TableCell align="center">{car.manufacturer}</TableCell>
                  <TableCell align="center">{car.modelYear}</TableCell>
                  <TableCell align="center">
                    {car.date ?? "Неизвестно"}
                  </TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                        alignItems: " center",
                      }}
                    >
                      <Button
                        onClick={(event) => funSetCurrentCar?.(event, car)}
                        sx={{
                          backgroundColor: "var(--default-color-button)",
                          transition: "var(--default-transition)",
                          "&:hover": {
                            background: "var(--default-color-button-hover)",
                          },
                        }}
                        variant="contained"
                      >
                        Завершить обслуживание
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
              {"recomm" in car && (
                <>
                  <TableCell align="center" component="th" scope="row">
                    {car.nameMaster}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {car.manufacturer}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {car.modelYear}
                  </TableCell>
                  <TableCell align="center">
                    {car.workOncar.trim().length === 0
                      ? "Работа была проведена успешна"
                      : car.workOncar}{" "}
                  </TableCell>

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
                        onClick={(event) => deleteHandler?.(event, car)}
                        sx={{
                          backgroundColor: "var(--default-color-button)",
                          transition: "var(--default-transition)",
                          "&:hover": {
                            background: "var(--default-color-button-hover)",
                          },
                        }}
                        variant="contained"
                      >
                        Удалить
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableContainer>
  );
};

export default DataTable;
