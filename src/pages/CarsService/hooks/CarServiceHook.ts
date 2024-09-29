/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useEffect, useState } from "react";

import { useTypedDispatch, useTypedSelector } from "../../../state/hooks/hooks";

import {
  addServiceCar,
  findServiceCar,
  sortServiceCarDaterDown,
  sortServiceCarDateUp,
  sortServiceCarManufacturerDown,
  sortServiceCarManufacturerUp,
  sortServiceCarModelYearDown,
  sortServiceCarModelYearUp,
  sortServiceCarNameMasterDown,
  sortServiceCarNameMasterUp,
} from "../../../state/slices/ServiceCarSlice";
import { carsServiceAPI, carsServiceSchema } from "../api/CarsServiceAPI";
import { cardService } from "../types";

export type SortStateType = {
  nameMaster: boolean;
  manufacturer: boolean;
  modelYear: boolean;
  date: boolean;
};

export const useCarService = () => {
  const dispatch = useTypedDispatch();
  const cars = useTypedSelector((state) => state.serviceCar.cars);
  const filteredCars = useTypedSelector(
    (state) => state.serviceCar.filteredItems,
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

  const [getCarsService] = carsServiceAPI.useLazyFetchCarsServiceQuery();

  useEffect(() => {
    (async () => {
      const carsDB = carsServiceSchema.parse((await getCarsService("")).data);
      if (carsDB && cars.length == 0) {
        // Массив не возвращается, поэтому можно использовать forEach
        carsDB.forEach((x) => dispatch(addServiceCar(x)));
      }
    })();
    // Обновил зависимости
  }, [cars.length]);

  useEffect(() => {
    // Cars может и не быть, нужна проверка
    // Не нужно запускать filterWord всегда, нужна проверка на длину
    findCar(filterWord);
  }, [cars, filterWord]);

  const findCar = (filterWord: string) => {
    const rand = Math.random() * 1000;

    dispatch(
      findServiceCar({
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
      }),
    );
  };

  const handlerFindWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterWord(e.target.value);
    },
    [],
  );

  // Упростили логику работы с состоянием сортировки, путем мержа логики
  const dispatchSortAction = (prop: keyof typeof sortState) => {
    switch (prop) {
      case "nameMaster":
        upStateSort
          ? dispatch(sortServiceCarNameMasterUp())
          : dispatch(sortServiceCarNameMasterDown());

        break;
      case "manufacturer":
        upStateSort
          ? dispatch(sortServiceCarManufacturerUp())
          : dispatch(sortServiceCarManufacturerDown());

        break;
      case "modelYear":
        upStateSort
          ? dispatch(sortServiceCarModelYearUp())
          : dispatch(sortServiceCarModelYearDown());

        break;
      case "date":
        upStateSort
          ? dispatch(sortServiceCarDateUp())
          : dispatch(sortServiceCarDaterDown());

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
