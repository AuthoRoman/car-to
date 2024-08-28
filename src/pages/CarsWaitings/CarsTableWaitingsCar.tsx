// Компонент для отображения таблицы автомобилей
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCellWithSort from "../../components/Table/TableCellWithSort";

import { SortStateTypeWaitingCars } from "./CarListWaitingHook";
import { ICar } from "../../state/types";

interface ICarTableProps {
  filteredCars: ICar[];
  sortState: SortStateTypeWaitingCars;
  upStateSort: boolean;
  handlerChangeDefaultState: (prop: keyof SortStateTypeWaitingCars) => void;
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

export const CarsTable = (props: ICarTableProps) => {
  const {
    filteredCars,
    sortState,
    upStateSort,
    handlerChangeDefaultState,
    getInfocar,
    deleteCar,
    handleServicePop,
  } = props;

  return (
    <div style={{ display: "flex" }}>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", margin: "0 auto" }}
      >
        <Table sx={{ minWidth: 100, width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellWithSort
                title={"Имя Фамилия"}
                state={sortState.defaultStateSortFullName}
                arrowState={upStateSort!}
                onClick={() =>
                  handlerChangeDefaultState("defaultStateSortFullName")
                }
              />
              <TableCellWithSort
                title={"E-mail"}
                state={sortState.defaultStateSortEmail}
                arrowState={upStateSort!}
                onClick={() =>
                  handlerChangeDefaultState("defaultStateSortEmail")
                }
              />
              <TableCellWithSort
                title={"Номер авто"}
                state={sortState.defaultStateSortNumberAuto}
                arrowState={upStateSort!}
                onClick={() =>
                  handlerChangeDefaultState("defaultStateSortNumberAuto")
                }
              />

              <TableCellWithSort
                title={"Заявка сформирована"}
                state={sortState.defaultStateSortTime}
                arrowState={upStateSort!}
                onClick={() =>
                  handlerChangeDefaultState("defaultStateSortTime")
                }
              />

              <TableCell align="center">Действие </TableCell>
            </TableRow>
          </TableHead>
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
      </TableContainer>
    </div>
  );
};
