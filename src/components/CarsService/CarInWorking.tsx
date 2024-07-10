import React, { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import CarsInService from "../../pages/CarsInService";
import FinishPopup from "../Popups/FinishPopup/FinishPopup";
import {
  cardService,
  ICar,
  serviceCarTypesAction,
  TypeBases,
} from "../../state/types";
import { useDispatch } from "react-redux";
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
import InfoServiceCar from "../Popups/InfoAboutCarsPopup/InfoServiceCar/InfoServiceCar";

import styles from "./CarService.module.css";
import TableCellWithSort from "../Table/TableCellWithSort";
import NoCarList from "../NoCarList/NoCarList";

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
  const [downStateSort, setDownStateSort] = useState(false);

  useEffect(() => {
    (async () => {
      if (cars.length == 0) {
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
          payload: {
            nameMaster: "string",
            id: 0,
            VIN: "string",
            region: "string",
            country: "string",
            manufacturer: "string",
            vehicleAttributes: "string",
            checkDigit: "string",
            modelYear: "string",
            assemblyPlant: "string",
            serialNumber: "string",
            problems: "string",
            date: "strin",
          },
        });
      }
      if (downStateSort === true) {
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_NAME_MASTER_DOWN,
          payload: {
            nameMaster: "string",
            id: 0,
            VIN: "string",
            region: "string",
            country: "string",
            manufacturer: "string",
            vehicleAttributes: "string",
            checkDigit: "string",
            modelYear: "string",
            assemblyPlant: "string",
            serialNumber: "string",
            problems: "string",
            date: "strin",
          },
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
          payload: {
            id: 0,
            VIN: "",
            tel: "",
            email: "",
            firstNameOwner: "",
            secondNameOwner: "",
            numberOwners: 0,
            color: "string",
            carMileage: "string",
            carNumber: filterWord,
            registration: "string",
            accidents: "string",
            date: "string",
            problems: "string",
          },
        });
      }
      if (downStateSort === true) {
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MANUFACTURER_DOWN,
          payload: {
            id: 0,
            VIN: "",
            tel: "",
            email: "",
            firstNameOwner: "",
            secondNameOwner: "",
            numberOwners: 0,
            color: "string",
            carMileage: "string",
            carNumber: filterWord,
            registration: "string",
            accidents: "string",
            date: "string",
            problems: "string",
          },
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
          payload: {
            id: 0,
            VIN: "",
            tel: "",
            email: "",
            firstNameOwner: "",
            secondNameOwner: "",
            numberOwners: 0,
            color: "string",
            carMileage: "string",
            carNumber: filterWord,
            registration: "string",
            accidents: "string",
            date: "string",
            problems: "string",
          },
        });
      }
      if (downStateSort === true) {
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MODEL_YEAR_DOWN,
          payload: {
            id: 0,
            VIN: "",
            tel: "",
            email: "",
            firstNameOwner: "",
            secondNameOwner: "",
            numberOwners: 0,
            color: "string",
            carMileage: "string",
            carNumber: filterWord,
            registration: "string",
            accidents: "string",
            date: "string",
            problems: "string",
          },
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
          payload: {
            id: 0,
            VIN: "",
            tel: "",
            email: "",
            firstNameOwner: "",
            secondNameOwner: "",
            numberOwners: 0,
            color: "string",
            carMileage: "string",
            carNumber: filterWord,
            registration: "string",
            accidents: "string",
            date: "string",
            problems: "string",
          },
        });
      }
      if (downStateSort === true) {
        dispatch({
          type: serviceCarTypesAction.SORT_SERVICE_CAR_CAR_DATE_DOWN,
          payload: {
            id: 0,
            VIN: "",
            tel: "",
            email: "",
            firstNameOwner: "",
            secondNameOwner: "",
            numberOwners: 0,
            color: "string",
            carMileage: "string",
            carNumber: filterWord,
            registration: "string",
            accidents: "string",
            date: "string",
            problems: "string",
          },
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
      setDownStateSort(true);
    }
    if (downStateSort === true) {
      setDownStateSort(false);
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
          <InfoServiceCar closeInfoCar={closeInfoCar!} car={currentCar!} />
        </div>
      )}
      {cars?.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: " center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <NoCarList text={'Заявок в обслуживании нет'}/>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "start",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <div className={styles.tableService}>
            <div>
              <TextField className={styles.tableWaitngList__findField}  onChange={(e) => setFilterWord(e.target.value)}   id="outlined-search" label="Поиск: имя мастера" type="search" />
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
                      handlerChangeDefaultState("defaultStateSortManufacturer")
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
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          onClick={(event) => funSetCurrentCar(event, car)}
                          sx={{
                            backgroundColor: "#705AF8",
                            "&:hover": {
                              background: "#7975F8",
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
