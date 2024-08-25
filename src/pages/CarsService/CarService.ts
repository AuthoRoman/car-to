import React, { useCallback, useEffect, useState } from "react";

import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import {
  cardService,
  serviceCarTypesAction,
  TypeBases,
} from "../../state/types";

import { getStoreData } from "../../api/database/db";

export type SortStateType = {
  nameMaster: boolean;
  manufacturer: boolean;
  modelYear: boolean;
  date: boolean;
};

export const useCarService = () => {
  const dispatch = useTypedDispatch();
  const cars = useTypedSelector((state) => state.carsInServ.cars);
  const filteredCars = useTypedSelector(
    (state) => state.carsInServ.filteredItems,
  );

  const [sortState, setSortState] = useState<SortStateType>({
    nameMaster: true,
    manufacturer: true,
    modelYear: true,
    date: true,
  });

  const [currentCar, setCurrentCar] = useState<cardService>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenServiceInfo, setIsOpenServiceInfo] = useState(false);

  //sort
  const [filterWord, setFilterWord] = useState("");
  const [upStateSort, setUpStateSort] = useState(false);

  useEffect(() => {
    (async () => {
      if (cars.length === 0) {
        const carsDB = await getStoreData<cardService>(
          TypeBases.CARS_IN_SERVICE,
        );

        // Массив не возвращается, поэтому можно использовать forEach
        carsDB.forEach((x) =>
          dispatch({ type: serviceCarTypesAction.ADD_SERVICE_CAR, payload: x }),
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
    [],
  );

  // Упростили логику работы с состоянием сортировки, путем мержа логики
  const dispatchSortAction = (prop: keyof typeof sortState) => {
    const sortActionMap = {
      nameMaster: upStateSort
        ? serviceCarTypesAction.SORT_SERVICE_CAR_CAR_NAME_MASTER_UP
        : serviceCarTypesAction.SORT_SERVICE_CAR_CAR_NAME_MASTER_DOWN,
      manufacturer: upStateSort
        ? serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MANUFACTURER_UP
        : serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MANUFACTURER_DOWN,
      modelYear: upStateSort
        ? serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MODEL_YEAR_UP
        : serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MODEL_YEAR_DOWN,
      date: upStateSort
        ? serviceCarTypesAction.SORT_SERVICE_CAR_CAR_DATE_UP
        : serviceCarTypesAction.SORT_SERVICE_CAR_CAR_DATE_DOWN,
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

  const togglePopup = (booleanValue: boolean) => {
    setIsOpen(booleanValue);
  };

  const funSetCurrentCar = (
    event: React.FormEvent<EventTarget>,
    car: cardService,
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

  return {
    togglePopup,
    closeInfoCar,
    getInfoServiceCard,
    funSetCurrentCar,
    handlerChangeDefaultState,
    filteredCars,
    handlerFindWord,
    isOpenServiceInfo,
    isOpen,
    currentCar,
    cars,
    upStateSort,
    sortState,
  };
};
