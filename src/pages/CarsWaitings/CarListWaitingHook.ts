/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useEffect, useState } from "react";

import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import { ICar } from "../../state/types";

import {
  addCarsInWaiting,
  deleteWaitingCar,
  findCarWaiting,
  sortCarEmailDown,
  sortCarEmailUp,
  sortCarFirstnameOwnerDown,
  sortCarFirstNameOwnerUp,
  sortCarNumberAutoDown,
  sortCarNumberAutoUp,
  sortCarTimeDown,
  sortCarTimeUp,
} from "../../state/slices/CarsInWaitingsSlice";
import { carsWaitingAPI } from "./api/carsWaitingAPI";

export type SortStateTypeWaitingCars = {
  defaultStateSortFullName: boolean;
  defaultStateSortEmail: boolean;
  defaultStateSortNumberAuto: boolean;
  defaultStateSortTime: boolean;
};

export const useCarListWaitingHook = () => {
  const dispatch = useTypedDispatch();
  const cars = useTypedSelector((state) => state.cars.cars);
  const filteredCars = useTypedSelector((state) => state.cars.filteredItems);

  const [sortState, setSortState] = useState<SortStateTypeWaitingCars>({
    defaultStateSortFullName: true,
    defaultStateSortEmail: true,
    defaultStateSortNumberAuto: true,
    defaultStateSortTime: true,
  });

  const [currentCar, setCurrentCar] = useState<ICar>();
  const [isVisiblePopup, setIsVisiblePopup] = useState<boolean>(false);
  const [isVisiblePopupWaitingsCar, setIsVisiblePopupWaitingsCar] =
    useState(false);
  const [isOpenPopupEdit, setisOpenPopupEdit] = useState<boolean>(false);
  const [PopupFixCar, setPopupFixCar] = useState<boolean>(false);

  //sort
  const [filterWord, setFilterWord] = useState("");
  const [upStateSort, setUpStateSort] = useState<boolean>(false);

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
  const [deleteData] = carsWaitingAPI.useDeleteWaitingCarMutation();
  const [getCars, { isLoading }] =
    carsWaitingAPI.useLazyFetchWaitingsCarsQuery();
  useEffect(() => {
    (async () => {
      const carsDB = (await getCars("")).data;
      if (cars.length === 0 && carsDB) {
        carsDB.forEach((x) => dispatch(addCarsInWaiting(x)));
      }
    })();
  }, [cars.length, dispatch]);

  useEffect(() => {
    findCar(filterWord);
  }, [cars, filterWord]);

  const deleteCar = async (event: React.FormEvent<EventTarget>, car: ICar) => {
    console.log(car);
    event.stopPropagation();
    await deleteData(car.id);
    dispatch(deleteWaitingCar(car));
  };

  const closeWithNextStadyCar = async () => {
    if (currentCar) {
      await deleteData(currentCar.id);
      await dispatch(deleteWaitingCar(currentCar));

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
  const openPopupCreateCars = () => {
    setIsVisiblePopup(true);
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
    car: ICar,
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
    tel: string,
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
    dispatch(
      findCarWaiting({
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
      }),
    );
  };

  const handlerFindWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterWord(e.target.value);
    },
    [],
  );

  const dispatchSortAction = (prop: keyof typeof sortState) => {
    switch (prop) {
      case "defaultStateSortEmail":
        upStateSort ? dispatch(sortCarEmailUp()) : dispatch(sortCarEmailDown());
        break;
      case "defaultStateSortFullName":
        upStateSort
          ? dispatch(sortCarFirstNameOwnerUp())
          : dispatch(sortCarFirstnameOwnerDown());
        break;
      case "defaultStateSortNumberAuto":
        upStateSort
          ? dispatch(sortCarNumberAutoUp())
          : dispatch(sortCarNumberAutoDown());
        break;
      case "defaultStateSortTime":
        upStateSort ? dispatch(sortCarTimeUp()) : dispatch(sortCarTimeDown());
        break;
      default:
        break;
    }
  };

  // Упростили логику переключения сортировок
  const handlerChangeDefaultState = (prop: keyof typeof sortState) => {
    setSortState((prevState) => {
      const newState = prevState;
      for (const item in prevState) {
        if (item === prop) {
          newState[item as keyof typeof sortState] = false;
        } else {
          newState[item as keyof typeof sortState] = true;
        }
      }
      return newState;
    });

    handlerChangeStateSort();

    dispatchSortAction(prop);
  };

  // Упростили логику работы с состоянием
  const handlerChangeStateSort = () => {
    setUpStateSort((prevState) => !prevState);
  };

  return {
    deleteCar,
    close,
    closeInfoCar,
    closeWithNextStadyCar,
    closeEditor,
    openPopupCreateCars,
    getInfocar,
    OpenPopupEdit,
    handlerChangeDefaultState,
    filteredCars,
    handleServicePop,
    handlerFindWord,
    isVisiblePopup,
    isVisiblePopupWaitingsCar,
    isOpenPopupEdit,
    PopupFixCar,
    currentCar,
    cars,
    upStateSort,
    sortState,
    firstNameOwner,
    secondNameOwner,
    accidents,
    carMileage,
    carNumber,
    color,
    email,
    numberOwners,
    problems,
    registration,
    tel,
    VIN,
    CurrentCarId,
    isLoading,
  };
};
