/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useEffect, useState } from "react";

import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import { ICar, typesOfActionsCar, TypeBases } from "../../state/types";

import { deleteData, getStoreData } from "../../api/database/db";

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

  useEffect(() => {
    (async () => {
      if (cars.length === 0) {
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_WAITING);

        // Массив не возвращается, поэтому можно использовать forEach
        carsDB.forEach((x) =>
          dispatch({ type: typesOfActionsCar.ADD_CAR, payload: x }),
        );
      }
    })();
    // Обновил зависимости
  }, [cars.length, dispatch]);

  useEffect(() => {
    // Cars может и не быть, нужна проверка
    // Не нужно запускать filterWord всегда, нужна проверка на длину
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
    [],
  );

  // Упростили логику работы с состоянием сортировки, путем мержа логики
  const dispatchSortAction = (prop: keyof typeof sortState) => {
    const sortActionMap = {
      defaultStateSortFullName: upStateSort
        ? typesOfActionsCar.SORT_CAR_FIRSTNAMEOWNER_UP
        : typesOfActionsCar.SORT_CAR_FIRSTNAMEOWNER_DOWN,
      defaultStateSortEmail: upStateSort
        ? typesOfActionsCar.SORT_CAR_EMAIL_UP
        : typesOfActionsCar.SORT_CAR_EMAIL_DOWN,
      defaultStateSortNumberAuto: upStateSort
        ? typesOfActionsCar.SORT_CAR_NUMBERAUTO_UP
        : typesOfActionsCar.SORT_CAR_NUMBERAUTO_DOWN,
      defaultStateSortTime: upStateSort
        ? typesOfActionsCar.SORT_CAR_TIME_UP
        : typesOfActionsCar.SORT_CAR_TIME_DOWN,
    };

    dispatch({ type: sortActionMap[prop] });
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
  };
};
