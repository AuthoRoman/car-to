import { useCallback, useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import { deleteData, getStoreData } from "../../api/database/db";
import { cardFinish, finishCarTypesAction, TypeBases } from "../../state/types";

export type SortStateTypeFinishCars = {
  defaultStateSortNameMaster: boolean;
  defaultStateSortManufacturer: boolean;
  defaultStateSortModelYear: boolean;
  defaultStateSortWork: boolean;
};

export const useCarFinishHook = () => {
  const dispatch = useTypedDispatch();
  const cars = useTypedSelector((state) => state.carsInFinish.cars);
  const filteredCars = useTypedSelector(
    (state) => state.carsInFinish.filteredItems,
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

  useEffect(() => {
    (async () => {
      if (cars.length === 0) {
        const carsDB = await getStoreData<cardFinish>(TypeBases.CARS_IN_FINISH);

        // Массив не возвращается, поэтому можно использовать forEach
        carsDB.forEach((x) =>
          dispatch({ type: finishCarTypesAction.ADD_FINISH_CAR, payload: x }),
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
      type: finishCarTypesAction.FIND_FINISH_CAR,
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
  const deleteHandler = async (
    event: React.FormEvent<EventTarget>,
    car: cardFinish,
  ) => {
    event.stopPropagation();
    await dispatch({
      type: finishCarTypesAction.DELETE_FINISH_CAR,
      payload: car!,
    });
    await deleteData(TypeBases.CARS_IN_FINISH, car.id);
  };
  // Упростили логику работы с состоянием сортировки, путем мержа логики
  const dispatchSortAction = (prop: keyof typeof sortState) => {
    const sortActionMap = {
      defaultStateSortNameMaster: upStateSort
        ? finishCarTypesAction.SORT_FINISH_CAR_CAR_NAME_MASTER_UP
        : finishCarTypesAction.SORT_FINISH_CAR_CAR_NAME_MASTER_DOWN,
      defaultStateSortManufacturer: upStateSort
        ? finishCarTypesAction.SORT_FINISH_CAR_CAR_MANUFACTURER_UP
        : finishCarTypesAction.SORT_FINISH_CAR_CAR_MANUFACTURER_DOWN,
      defaultStateSortModelYear: upStateSort
        ? finishCarTypesAction.SORT_FINISH_CAR_CAR_MODEL_YEAR_UP
        : finishCarTypesAction.SORT_FINISH_CAR_CAR_MODEL_YEAR_DOWN,
      defaultStateSortWork: upStateSort
        ? finishCarTypesAction.SORT_FINISH_CAR_CAR_WORK_UP
        : finishCarTypesAction.SORT_FINISH_CAR_CAR_WORK_DOWN,
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
