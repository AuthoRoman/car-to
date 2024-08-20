import React, { useCallback, useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import CreateCardPopup from "../../components/Popups/CreateCardWaitingsPopup/CreateCardPopup";
import ServicePopup from "../../components/Popups/ServicePopup/ServicePopup";
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
import { ICar, TypeBases, typesOfActionsCar } from "../../state/types";
import { deleteData, getStoreData } from "../../api/database/db";
import InfoWaitingsCars from "../../components/Popups/InfoAboutCarsPopup/InfoPopupCar/InfoPopupCars";
import TableCellWithSort from "../../components/Table/TableCellWithSort";
import NoCarList from "../../components/NoCarList/NoCarList";

import styles from "./CarsListWaiting.module.scss";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import ButtonPlus from "../../components/ui/ButtonPlus/ButtonPlus";

const CarsListWaiting = () => {
  //Work with reducers
  const dispatch = useTypedDispatch();
  const filteredCars = useTypedSelector((state) => state.cars.filteredItems);
  const cars = useTypedSelector((state) => state.cars.cars);
  //Popups
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [isVisiblePopupWaitingsCar, setIsVisiblePopupWaitingsCar] =
    useState(false);
  const [isOpenPopupEdit, setisOpenPopupEdit] = useState(false);
  const [PopupFixCar, setPopupFixCar] = useState(false);
  //OptionscurrentCar
  const [currentCar, setCurrentCar] = useState<ICar>();
  //EditCars options
  const [firstNameOwner, setFirstNameOwner] = useState("");
  const [secondNameOwner, setSecondNameOwner] = useState("");
  const [accidents, setAccidents] = useState<string>("");
  const [carMileage, setCarMileage] = useState<string>("");
  const [carNumber, setCarNumber] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [numberOwners, setNumberOwners] = useState<number | null>(null);
  const [problems, setProblems] = useState<string>("");
  const [registration, setRegistration] = useState<string>("");
  const [tel, setTel] = useState<string>();
  const [VIN, setVIN] = useState("");
  const [CurrentCarId, setCurrentCarId] = useState<number>();
  //Sort
  const [filterWord, setFilterWord] = useState("");
  const [defaultStateSortFullName, setDefaultStateSortFullName] =
    useState(true);
  const [defaultStateSortEmail, setDefaultStateSortEmail] = useState(true);
  const [defaultStateSortNumberAuto, setDefaultStateSortNumberAuto] =
    useState(true);
  const [defaultStateSortTime, setDefaultStateSortTime] = useState(true);
  const [upStateSort, setUpStateSort] = useState<boolean | null>(false);

  useEffect(() => {
    (async () => {
      if (cars?.length === 0) {
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_WAITING);
        carsDB.map((x) =>
          dispatch({ type: typesOfActionsCar.ADD_CAR, payload: x })
        );
      }
    })();
  }, []);

  useEffect(() => {
    findCar(filterWord);
  }, [cars, filterWord]);

  const deleteCar = async (event: React.FormEvent<EventTarget>, car: ICar) => {
    event.stopPropagation();
    await dispatch({ type: typesOfActionsCar.DELETE_CAR, payload: car! });
    await deleteData(TypeBases.CARS_IN_WAITING, car.id);
  };

  const closeWithNextStadyCar = async () => {
    if (currentCar) {
      await dispatch({
        type: typesOfActionsCar.DELETE_CAR,
        payload: currentCar!,
      });
      await deleteData(TypeBases.CARS_IN_WAITING, currentCar.id);

      setPopupFixCar(false);
    }
  };

  const getInfocar = (car: ICar) => {
    setCurrentCar(car);
    setIsVisiblePopupWaitingsCar(true);
  };
  const closeInfoCar = () => {
    setIsVisiblePopupWaitingsCar(false);
  };

  const close = () => {
    PopupFixCar ? setPopupFixCar(false) : setIsVisiblePopup(false);
  };
  const closeEditor = () => {
    setisOpenPopupEdit(false);
  };

  function handleServicePop(
    event: React.FormEvent<EventTarget>,
    VIN: string,
    car: ICar
  ) {
    event.stopPropagation();
    setCurrentCar(car);
    setVIN(VIN);
    setPopupFixCar(true);
  }

  const OpenPopupEdit = (
    VIN: string,
    id: number,
    accidents: string,
    carMileage: string,
    carNumber: string,
    color: string,
    email: string,
    firstNameOwner: string,
    secondNameOwner: string,
    numberOwners: number,
    problems: string,
    registration: string,
    tel: string
  ) => {
    setCurrentCarId(id);
    setVIN(VIN);
    setAccidents(accidents);
    setCarMileage(carMileage);
    setCarNumber(carNumber);
    setColor(color);
    setEmail(email);
    setNumberOwners(numberOwners);
    setProblems(problems);
    setRegistration(registration);
    setTel(tel);

    setFirstNameOwner(firstNameOwner);
    setSecondNameOwner(secondNameOwner);

    setisOpenPopupEdit(true);
    setIsVisiblePopupWaitingsCar(false);
  };
  const findCar = (filterWord: string) => {
    const rand = Math.random() * 20;
    console.log("find");
    dispatch({
      type: typesOfActionsCar.FIND_CAR,
      payload: {
        id: rand,
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
  };

  const handlerFindWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterWord(e.target.value);
    },
    []
  );

  const handlerChangeDefaultState = (prop: string) => {
    if (prop === "defaultStateSortFullName") {
      setDefaultStateSortFullName(false);
      setDefaultStateSortEmail(true);
      setDefaultStateSortNumberAuto(true);
      setDefaultStateSortTime(true);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("up");
        dispatch({
          type: typesOfActionsCar.SORT_CAR_FIRSTNAMEOWNER_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: typesOfActionsCar.SORT_CAR_FIRSTNAMEOWNER_DOWN,
        });
      }
    }
    if (prop === "defaultStateSortEmail") {
      setDefaultStateSortFullName(true);
      setDefaultStateSortEmail(false);
      setDefaultStateSortNumberAuto(true);
      setDefaultStateSortTime(true);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("up");
        dispatch({
          type: typesOfActionsCar.SORT_CAR_EMAIL_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: typesOfActionsCar.SORT_CAR_EMAIL_DOWN,
        });
      }
    }
    if (prop === "defaultStateSortNumberAuto") {
      setDefaultStateSortFullName(true);
      setDefaultStateSortEmail(true);
      setDefaultStateSortNumberAuto(false);
      setDefaultStateSortTime(true);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("up");
        dispatch({
          type: typesOfActionsCar.SORT_CAR_NUMBERAUTO_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: typesOfActionsCar.SORT_CAR_NUMBERAUTO_DOWN,
        });
      }
    }
    if (prop === "defaultStateSortTime") {
      setDefaultStateSortFullName(true);
      setDefaultStateSortEmail(true);
      setDefaultStateSortNumberAuto(true);
      setDefaultStateSortTime(false);
      handlerChangeStateSort();
      if (upStateSort === true) {
        console.log("up");
        dispatch({
          type: typesOfActionsCar.SORT_CAR_TIME_UP,
        });
      }
      if (upStateSort === false) {
        dispatch({
          type: typesOfActionsCar.SORT_CAR_TIME_DOWN,
        });
      }
    }
  };

  const handlerChangeStateSort = () => {
    if (
      defaultStateSortFullName === true ||
      defaultStateSortEmail === true ||
      defaultStateSortNumberAuto === true ||
      defaultStateSortTime === true
    ) {
      setUpStateSort(true);
    }
    upStateSort === true ? setUpStateSort(false) : setUpStateSort(true);
  };

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isVisiblePopup && (
          <div>
            <CreateCardPopup closeVisible={close} />{" "}
          </div>
        )}
        {isOpenPopupEdit && (
          <div>
            <CreateCardPopup
              idCar={CurrentCarId}
              VINcar={VIN}
              editAccidents={accidents}
              editCarMileage={carMileage}
              editCarNumber={carNumber}
              editColor={color}
              editEmail={email}
              editFirstNameOwner={firstNameOwner}
              editSecondNameOwner={secondNameOwner}
              editNumberOwners={numberOwners!}
              editPhone={tel}
              editProblems={problems}
              editRegistration={registration}
              closeVisible={closeEditor}
            />{" "}
          </div>
        )}
        {PopupFixCar && (
          <div>
            <ServicePopup
              closeWithNextStadyCar={closeWithNextStadyCar}
              closeVisible={close}
              VIN={VIN}
              problems={currentCar?.problems!}
            />
          </div>
        )}
        {isVisiblePopupWaitingsCar && (
          <div>
            <InfoWaitingsCars
              closeInfoCar={closeInfoCar}
              car={currentCar!}
              isOpenPopupEdit={OpenPopupEdit}
            />
          </div>
        )}
        {cars?.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100vw",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginLeft: "65px",
              }}
            >
              <NoCarList
                text={'Нет автомобилей в очереди, чтобы добавить нажми на "+"'}
              />
            </div>

            <ButtonPlus onClick={() => setIsVisiblePopup(true)} height="55px" />
          </div>
        ) : (
          <div className={styles.tableWaitngList}>
            <div className={styles.tableWaitngList__findForm}>
              <SearchInput
                onChange={handlerFindWord}
                textLabel="Поиск: номер авто/имя фамилия"
              />
              <ButtonPlus onClick={() => setIsVisiblePopup(true)} />
            </div>

            <div style={{ display: "flex" }}>
              <TableContainer
                component={Paper}
                sx={{ width: "100%", margin: "0 auto" }}
              >
                <Table
                  sx={{ minWidth: 100, width: "100%" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCellWithSort
                        title={"Имя Фамилия"}
                        state={defaultStateSortFullName}
                        arrowState={upStateSort!}
                        onClick={() =>
                          handlerChangeDefaultState("defaultStateSortFullName")
                        }
                      />
                      <TableCellWithSort
                        title={"E-mail"}
                        state={defaultStateSortEmail}
                        arrowState={upStateSort!}
                        onClick={() =>
                          handlerChangeDefaultState("defaultStateSortEmail")
                        }
                      />
                      <TableCellWithSort
                        title={"Номер авто"}
                        state={defaultStateSortNumberAuto}
                        arrowState={upStateSort!}
                        onClick={() =>
                          handlerChangeDefaultState(
                            "defaultStateSortNumberAuto"
                          )
                        }
                      />

                      <TableCellWithSort
                        title={"Заявка сформирована"}
                        state={defaultStateSortTime}
                        arrowState={upStateSort!}
                        onClick={() =>
                          handlerChangeDefaultState("defaultStateSortTime")
                        }
                      />

                      <TableCell
                        onClick={handlerChangeStateSort}
                        align="center"
                      >
                        Действие{" "}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCars?.map((car) => (
                      <TableRow
                        onClick={() => getInfocar(car)}
                        key={car.numberOwners}
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
                              onClick={(event) =>
                                handleServicePop(event, car.VIN, car)
                              }
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
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default CarsListWaiting;
