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
import TableCellWithSort from "../../components/customDataTable/TableCellWithSort";
import styles from "./CarService.module.scss";
import { cardService } from "../../state/types";
import { SortStateType } from "./CarService";

interface ICarTableProps {
  filteredCars: cardService[];
  sortState: SortStateType;
  upStateSort: boolean;
  handlerChangeDefaultState: (prop: keyof SortStateType) => void;
  getInfoServiceCard: (car: cardService) => void;
  funSetCurrentCar: (
    event: React.FormEvent<EventTarget>,
    car: cardService,
  ) => void;
}

export const CarsTable = (props: ICarTableProps) => {
  const {
    filteredCars,
    funSetCurrentCar,
    sortState,
    upStateSort,
    handlerChangeDefaultState,
    getInfoServiceCard,
  } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100, width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCellWithSort
              title={"Имя мастера"}
              state={sortState.nameMaster}
              arrowState={upStateSort}
              onClick={() => handlerChangeDefaultState("nameMaster")}
            />
            <TableCellWithSort
              title={"Автомобиль"}
              state={sortState.manufacturer}
              arrowState={upStateSort}
              onClick={() => handlerChangeDefaultState("manufacturer")}
            />
            <TableCellWithSort
              title={"Год изготовления"}
              state={sortState.modelYear}
              arrowState={upStateSort}
              onClick={() => handlerChangeDefaultState("modelYear")}
            />
            <TableCellWithSort
              title={"Добавлен в обслуживание"}
              state={sortState.date}
              arrowState={upStateSort}
              onClick={() => handlerChangeDefaultState("date")}
            />
            <TableCell align="center">Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCars?.map((car) => (
            <TableRow
              onClick={() => getInfoServiceCard(car)}
              key={car.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { cursor: "pointer" },
              }}
            >
              <TableCell align="center">{car.nameMaster}</TableCell>
              <TableCell align="center">{car.manufacturer}</TableCell>
              <TableCell align="center">{car.modelYear}</TableCell>
              <TableCell align="center">{car.date ?? "Неизвестно"}</TableCell>
              <TableCell align="center">
                <div className={styles.actionCell}>
                  <Button
                    onClick={(event) => funSetCurrentCar(event, car)}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
