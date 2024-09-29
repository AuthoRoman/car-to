/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useCallback, useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../../state/hooks/hooks";

import {
  addFinishCar,
  deleteFinishCar,
  findFinishCar,
  sortFinishCarManufacturerDown,
  sortFinishCarManufacturerUp,
  sortFinishCarModelYearDown,
  sortFinishCarModelYearUp,
  sortFinishCarNameMasterDown,
  sortFinishCarNameMasterUp,
  sortFinishCarWorkDown,
  sortFinishCarWorkUp,
} from "../../../state/slices/FinishCarSlice";
import { carFinishAPI, carsFinishSchema } from ".././api/CarFinishAPI";
import { cardFinish } from ".././types";

export type SortStateTypeFinishCars = {
  defaultStateSortNameMaster: boolean;
  defaultStateSortManufacturer: boolean;
  defaultStateSortModelYear: boolean;
  defaultStateSortWork: boolean;
};

export const useCarFinishHook = () => {
  const dispatch = useTypedDispatch();
  const cars = useTypedSelector((state) => state.finishCars.cars);
  const filteredCars = useTypedSelector(
    (state) => state.finishCars.filteredItems,
  );
  const [isPopupInfoFinishCarOpen, setisPopupInfoFinishCarOpen] =
    useState<boolean>(false);
  const [sortState, setSortState] = useState<SortStateTypeFinishCars>({
    defaultStateSortNameMaster: true,
    defaultStateSortManufacturer: true,
    defaultStateSortModelYear: true,
    defaultStateSortWork: true,
  });

  const [currentCar, setCurrentCar] = useState<cardFinish>();
  const [isOpen, setIsOpen] = useState(false);

  //sort
  const [filterWord, setFilterWord] = useState("");
  const [upStateSort, setUpStateSort] = useState(false);
  const [getStoreData] = carFinishAPI.useLazyFetchCarsFinishQuery();
  const [deleteData] = carFinishAPI.useDeleteCarFinishMutation();

  useEffect(() => {
    (async () => {
      const carsDB = carsFinishSchema.parse((await getStoreData("")).data);
      if (carsDB && cars.length == 0) {
        // Массив не возвращается, поэтому можно использовать forEach
        carsDB.forEach((x) => dispatch(addFinishCar(x)));
      }
    })();
    // Обновил зависимости
  }, []);

  useEffect(() => {
    // Cars может и не быть, нужна проверка
    // Не нужно запускать filterWord всегда, нужна проверка на длину
    findCar(filterWord);
  }, [cars, filterWord]);

  const findCar = (filterWord: string) => {
    const rand = Math.random() * 1000;

    dispatch(
      findFinishCar({
        workOncar: "",
        recomm: "",
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
  const deleteHandler = async (
    event: React.FormEvent<EventTarget>,
    car: cardFinish,
  ) => {
    event.stopPropagation();
    await dispatch(deleteFinishCar(car));
    await deleteData(car.id);
  };
  // Упростили логику работы с состоянием сортировки, путем мержа логики
  const dispatchSortAction = (prop: keyof typeof sortState) => {
    switch (prop) {
      case "defaultStateSortNameMaster":
        upStateSort
          ? dispatch(sortFinishCarNameMasterUp())
          : dispatch(sortFinishCarNameMasterDown());

        break;
      case "defaultStateSortManufacturer":
        upStateSort
          ? dispatch(sortFinishCarManufacturerUp())
          : dispatch(sortFinishCarManufacturerDown());

        break;
      case "defaultStateSortModelYear":
        upStateSort
          ? dispatch(sortFinishCarModelYearUp())
          : dispatch(sortFinishCarModelYearDown());

        break;
      case "defaultStateSortWork":
        upStateSort
          ? dispatch(sortFinishCarWorkUp())
          : dispatch(sortFinishCarWorkDown());

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
    car: cardFinish,
  ) => {
    event.stopPropagation();
    setCurrentCar(car);
    togglePopup(true);
  };

  const getInfo = (car: cardFinish) => {
    setisPopupInfoFinishCarOpen(true);
    setCurrentCar(car);
  };

  const closePopup = () => {
    setisPopupInfoFinishCarOpen(false);
  };

  return {
    togglePopup,
    closePopup,
    getInfo,
    funSetCurrentCar,
    handlerChangeDefaultState,
    isPopupInfoFinishCarOpen,
    filteredCars,
    handlerFindWord,
    deleteHandler,
    isOpen,
    currentCar,
    cars,
    upStateSort,
    sortState,
  };
};
