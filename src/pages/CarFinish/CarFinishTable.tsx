import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React from "react";
import TableCellWithSort from "../../components/customDataTable/TableCellWithSort";
import { SortStateTypeFinishCars } from "./CarFinishHook";
import { cardFinish } from "../../state/types";

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
    upStateSort,
    handlerChangeDefaultState,
    filteredCars,
    getInfo,
    deleteHandler,
  } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100, width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCellWithSort
              title="Имя мастера взявшего авто"
              state={sortState.defaultStateSortNameMaster}
              arrowState={upStateSort}
              onClick={() =>
                handlerChangeDefaultState("defaultStateSortNameMaster")
              }
            />
            <TableCellWithSort
              title="Автомобиль"
              state={sortState.defaultStateSortManufacturer}
              arrowState={upStateSort}
              onClick={() =>
                handlerChangeDefaultState("defaultStateSortManufacturer")
              }
            />
            <TableCellWithSort
              title="Год выпуска авто"
              state={sortState.defaultStateSortModelYear}
              arrowState={upStateSort}
              onClick={() =>
                handlerChangeDefaultState("defaultStateSortModelYear")
              }
            />
            <TableCellWithSort
              title="Работа сделанная над автомобилем"
              state={sortState.defaultStateSortWork}
              arrowState={upStateSort}
              onClick={() => handlerChangeDefaultState("defaultStateSortWork")}
            />

            <TableCell align="center">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCars.map((car) => (
            <TableRow
              key={car.id}
              onClick={() => getInfo(car)}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { cursor: "pointer" },
              }}
            >
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
                    onClick={(event) => deleteHandler(event, car)}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CarFinishTable;
