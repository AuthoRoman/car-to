import React, { useCallback, useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import styles from "./CarFinishPage.module.scss";
import {
  cardFinish,
  finishCarTypesAction,
  ICar,
  TypeBases,
} from "../../state/types";
import { deleteData, getStoreData } from "../../api/database/db";

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
import NoCarList from "../../components/NoCarList/NoCarList";
import InfoPopupCars from "../../components/Popups/InfoAboutCarsPopup/InfoPopupCar/InfoPopupCars";
import SearchInput from "../../components/ui/SearchInput/SearchInput";

export default function CarFinishComponent() {
  const dispatch = useTypedDispatch();
  const [isPopupInfoFinishCarOpen, setisPopupInfoFinishCarOpen] =
    useState<boolean>(false);
  const [currentCar, setCurrentCar] = useState<cardFinish>();
  const cars = useTypedSelector((state) => state.carsInFinish.cars);
  const filteredCars = useTypedSelector(
    (state) => state.carsInFinish.filteredItems
  );
  const [filterWord, setFilterWord] = useState("");

  const [defaultStateSortNameMaster, setDefaultStateSortNameMaster] =
    useState(true);
  const [defaultStateSortManufacturer, setDefaultStateSortManufacturer] =
    useState(true);
  const [defaultStateSortModelYear, setDefaultStateSortModelYear] =
    useState(true);
  const [defaultStateSortWork, setDefaultStateSortWork] = useState(true);
  const [upStateSort, setUpStateSort] = useState(false);

  const deleteHandler = async (
    event: React.FormEvent<EventTarget>,
    car: cardFinish
  ) => {
    event.stopPropagation();
    await deleteData(TypeBases.CARS_IN_FINISH, car.id);
    dispatch({ type: finishCarTypesAction.DELETE_FINISH_CAR, payload: car });
  };

  const getInfo = (car: cardFinish) => {
    setisPopupInfoFinishCarOpen(true);
    setCurrentCar(car);
  };

  const closePopup = () => {
    setisPopupInfoFinishCarOpen(false);
  };

  useEffect(() => {
    if (cars.length === 0) {
      (async () => {
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_FINISH);
        carsDB.map((car) =>
          dispatch({ type: finishCarTypesAction.ADD_FINISH_CAR, payload: car })
        );
      })();
    }
  }, []);

  useEffect(() => {
    findCar(filterWord);
  }, [cars, filterWord]);

  const findCar = (prop: string) => {
    const rand = Math.random() * 10;
    dispatch({
      type: finishCarTypesAction.FIND_FINISH_CAR,
      payload: {
        nameMaster: prop,
        id: rand,
        VIN: "",
        region: "",
        country: "",
        manufacturer: "",
        vehicleAttributes: "",
        checkDigit: "",
        modelYear: "",
        assemblyPlant: "",
        serialNumber: "",
        problems: "",
        date: "",
      },
    });
  };

  const handlerFindWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterWord(e.target.value);
    },
    []
  );

  const handlerChangeDefaultState = (prop: string) => {
    if (prop === "defaultStateSortNameMaster") {
      setDefaultStateSortNameMaster(false);
      setDefaultStateSortManufacturer(true);
      setDefaultStateSortModelYear(true);
      setDefaultStateSortWork(true);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("mASTERup");
        dispatch({
          type: finishCarTypesAction.SORT_FINISH_CAR_CAR_NAME_MASTER_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: finishCarTypesAction.SORT_FINISH_CAR_CAR_NAME_MASTER_DOWN,
        });
      }
    }
    if (prop === "defaultStateSortManufacturer") {
      setDefaultStateSortNameMaster(true);
      setDefaultStateSortManufacturer(false);
      setDefaultStateSortModelYear(true);
      setDefaultStateSortWork(true);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("upManufac");
        dispatch({
          type: finishCarTypesAction.SORT_FINISH_CAR_CAR_MANUFACTURER_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: finishCarTypesAction.SORT_FINISH_CAR_CAR_MANUFACTURER_DOWN,
        });
      }
    }
    if (prop === "defaultStateSortModelYear") {
      setDefaultStateSortNameMaster(true);
      setDefaultStateSortManufacturer(true);
      setDefaultStateSortModelYear(false);
      setDefaultStateSortWork(true);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("up");
        dispatch({
          type: finishCarTypesAction.SORT_FINISH_CAR_CAR_MODEL_YEAR_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: finishCarTypesAction.SORT_FINISH_CAR_CAR_MODEL_YEAR_DOWN,
        });
      }
    }
    if (prop === "defaultStateSortWork") {
      setDefaultStateSortNameMaster(true);
      setDefaultStateSortManufacturer(true);
      setDefaultStateSortModelYear(true);
      setDefaultStateSortWork(false);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("up");
        dispatch({
          type: finishCarTypesAction.SORT_FINISH_CAR_CAR_WORK_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: finishCarTypesAction.SORT_FINISH_CAR_CAR_WORK_DOWN,
        });
      }
    }
  };

  const handlerChangeStateSort = () => {
    if (
      defaultStateSortNameMaster === true ||
      defaultStateSortManufacturer === true ||
      defaultStateSortModelYear === true ||
      defaultStateSortWork === true
    ) {
      setUpStateSort(true);
    }
    if (upStateSort === true) {
      setUpStateSort(false);
    }
    if (upStateSort === false) {
      setUpStateSort(true);
    }
  };

  return (
    <div>
      <div>
        {isPopupInfoFinishCarOpen && (
          <div>
            <InfoPopupCars car={currentCar!} closeInfoCar={closePopup} />
          </div>
        )}
        {cars.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "100%",
              justifyContent: " center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <NoCarList text={"Готовых машин пока нет"} />
          </div>
        ) : (
          <div
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              display: "flex",
              alignItems: "start",
            }}
          >
            <div className={styles.tableFinish}>
              <div>
                <SearchInput
                  onChange={handlerFindWord}
                  textLabel="Поиск: имя мастера"
                />
              </div>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 100, width: "100%" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCellWithSort
                        title={"Имя мастера взявшего авто"}
                        state={defaultStateSortNameMaster}
                        arrowState={upStateSort}
                        onClick={() =>
                          handlerChangeDefaultState(
                            "defaultStateSortNameMaster"
                          )
                        }
                      />
                      <TableCellWithSort
                        title={"Автомобиль"}
                        state={defaultStateSortManufacturer}
                        arrowState={upStateSort}
                        onClick={() =>
                          handlerChangeDefaultState(
                            "defaultStateSortManufacturer"
                          )
                        }
                      />
                      <TableCellWithSort
                        title={"Год выпуска авто"}
                        state={defaultStateSortModelYear}
                        arrowState={upStateSort}
                        onClick={() =>
                          handlerChangeDefaultState("defaultStateSortModelYear")
                        }
                      />
                      <TableCellWithSort
                        title={"Работа сделанная над автомобилем"}
                        state={defaultStateSortWork}
                        arrowState={upStateSort}
                        onClick={() =>
                          handlerChangeDefaultState("defaultStateSortWork")
                        }
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
                                  background:
                                    "var(--default-color-button-hover)",
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
