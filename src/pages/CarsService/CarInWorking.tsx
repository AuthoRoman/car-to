import React, { useCallback, useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import FinishPopup from "../../components/Popups/FinishPopup/FinishPopup";

import styles from "./CarService.module.scss";
import TableCellWithSort from "../../components/Table/TableCellWithSort";
import NoCarList from "../../components/NoCarList/NoCarList";
import {
  cardService,
  serviceCarTypesAction,
  TypeBases,
} from "../../state/types";
import { getStoreData } from "../../api/database/db";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import InfoWaitingsCars from "../../components/Popups/InfoAboutCarsPopup/InfoPopupCar/InfoPopupCars";
import SearchInput from "../../components/ui/SearchInput/SearchInput";

const CarinWorking: React.FC = () => {
  const filteredCars = useTypedSelector(
    (state) => state.carsInServ.filteredItems
  );

  const cars = useTypedSelector((state) => state.carsInServ.cars);
  const dispatch = useTypedDispatch();
  const [currentCar, setCurrentCar] = useState<cardService>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenServiceInfo, setIsOpenServiceInfo] = useState(false);
  //sort
  const [filterWord, setFilterWord] = useState("");
  const [defaultStateSortNameMaster, setDefaultStateSortNameMaster] =
    useState(true);
  const [defaultStateSortManufacturer, setDefaultStateSortManufacturer] =
    useState(true);
  const [defaultStateSortModelYear, setDefaultStateSortModelYear] =
    useState(true);
  const [defaultStateSortDate, setDefaultStateSortDate] = useState(true);
  const [upStateSort, setUpStateSort] = useState(false);

  useEffect(() => {
    (async () => {
      if (cars.length === 0) {
        const carsDB = await getStoreData<cardService>(
          TypeBases.CARS_IN_SERVICE
        );
        carsDB.map((x) =>
          dispatch({ type: serviceCarTypesAction.ADD_SERVICE_CAR, payload: x })
        );
      }
    })();
  }, []);

  useEffect(() => {
    findCar(filterWord);
  }, [cars, filterWord]);

  const findCar = (filterWord: string) => {
    const rand = Math.random() * 1000;
    console.log("as");
    dispatch({
      type: serviceCarTypesAction.FIND_SERVICE_CAR,
      payload: {
        nameMaster: filterWord,
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
      setDefaultStateSortDate(true);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("mASTERup");
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_NAME_MASTER_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_NAME_MASTER_DOWN,
        });
      }
    }
    if (prop === "defaultStateSortManufacturer") {
      setDefaultStateSortNameMaster(true);
      setDefaultStateSortManufacturer(false);
      setDefaultStateSortModelYear(true);
      setDefaultStateSortDate(true);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("upManufac");
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MANUFACTURER_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MANUFACTURER_DOWN,
        });
      }
    }
    if (prop === "defaultStateSortModelYear") {
      setDefaultStateSortNameMaster(true);
      setDefaultStateSortManufacturer(true);
      setDefaultStateSortModelYear(false);
      setDefaultStateSortDate(true);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("up");
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MODEL_YEAR_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MODEL_YEAR_DOWN,
        });
      }
    }
    if (prop === "defaultStateSortDate") {
      setDefaultStateSortNameMaster(true);
      setDefaultStateSortManufacturer(true);
      setDefaultStateSortModelYear(true);
      setDefaultStateSortDate(false);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("up");
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_DATE_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_DATE_DOWN,
        });
      }
    }
  };

  const handlerChangeStateSort = () => {
    if (
      defaultStateSortNameMaster === true ||
      defaultStateSortManufacturer === true ||
      defaultStateSortModelYear === true ||
      defaultStateSortDate === true
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

  const togglePopup = (booleanValue: boolean) => {
    setIsOpen(booleanValue);
  };

  const funSetCurrentCar = (
    event: React.FormEvent<EventTarget>,
    car: cardService
  ) => {
    event.stopPropagation();
    setCurrentCar(car);
    togglePopup(true);
  };

  const getInfoServiceCard = (car: cardService) => {
    setIsOpenServiceInfo(true);
    setCurrentCar(car);
  };
  const closeInfoCar = () => {
    setIsOpenServiceInfo(false);
  };
  return (
    <div>
      {isOpen && (
        <div>
          <FinishPopup togglePopup={togglePopup} car={currentCar} />
        </div>
      )}
      {isOpenServiceInfo && (
        <div>
          <InfoWaitingsCars closeInfoCar={closeInfoCar!} car={currentCar!} />
        </div>
      )}
      {cars?.length === 0 ? (
        <div className={styles.inServicPage}>
          <NoCarList text={"Заявок в обслуживании нет"} />
        </div>
      ) : (
        <div className={styles.containerTable}>
          <div className={styles.tableService}>
            <div>
              <SearchInput
                onChange={handlerFindWord}
                textLabel="Поиск: имя мастера"
              />
            </div>
            <TableContainer component={Paper} sx={{}}>
              <Table
                sx={{ minWidth: 100, width: "100%" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCellWithSort
                      title={"Имя мастера"}
                      state={defaultStateSortNameMaster}
                      arrowState={upStateSort}
                      onClick={() =>
                        handlerChangeDefaultState("defaultStateSortNameMaster")
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
                      title={"Год изготовления"}
                      state={defaultStateSortModelYear}
                      arrowState={upStateSort}
                      onClick={() =>
                        handlerChangeDefaultState("defaultStateSortModelYear")
                      }
                    />
                    <TableCellWithSort
                      title={"Добавлен в обслуживание"}
                      state={defaultStateSortDate}
                      arrowState={upStateSort}
                      onClick={() =>
                        handlerChangeDefaultState("defaultStateSortDate")
                      }
                    />

                    <TableCell align="center">Действие </TableCell>
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
                      <TableCell align="center" component="th" scope="row">
                        {car.nameMaster}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {car.manufacturer}
                      </TableCell>
                      <TableCell align="center">{car.modelYear} </TableCell>
                      <TableCell align="center">
                        {car.date ?? "Неизвестно"}
                      </TableCell>

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
          </div>
        </div>
      )}
    </div>
  );
};

export default CarinWorking;
