import { cardFinish, IAction, ICarsState } from "./../types";
import { finishCarTypesAction } from "../types";

const initialState: ICarsState<cardFinish> = {
  cars: [],
  filteredItems: [],
};

export const finishCarReducer = (
  state = initialState,
  action: IAction<cardFinish>
): ICarsState<cardFinish> => {
  switch (action.type) {
    case finishCarTypesAction.ADD_FINISH_CAR:
      return { ...state, cars: [...state.cars, action.payload!] };
    case finishCarTypesAction.FIND_FINISH_CAR:
      return {
        ...state,
        filteredItems: [...state.cars].filter((x) =>
          x.nameMaster
            .toLocaleLowerCase()
            .includes(action.payload!.nameMaster.toLocaleLowerCase())
        ),
      };
    case finishCarTypesAction.SORT_FINISH_CAR_CAR_NAME_MASTER_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.nameMaster.localeCompare(b.nameMaster)
        ),
      };
    case finishCarTypesAction.SORT_FINISH_CAR_CAR_MANUFACTURER_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.manufacturer.localeCompare(b.manufacturer)
        ),
      };
    case finishCarTypesAction.SORT_FINISH_CAR_CAR_MODEL_YEAR_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.modelYear.localeCompare(b.modelYear)
        ),
      };
    case finishCarTypesAction.SORT_FINISH_CAR_CAR_WORK_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.workOncar.localeCompare(b.workOncar)
        ),
      };
    case finishCarTypesAction.SORT_FINISH_CAR_CAR_NAME_MASTER_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.nameMaster.localeCompare(a.nameMaster)
        ),
      };
    case finishCarTypesAction.SORT_FINISH_CAR_CAR_MANUFACTURER_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.manufacturer.localeCompare(a.manufacturer)
        ),
      };
    case finishCarTypesAction.SORT_FINISH_CAR_CAR_MODEL_YEAR_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.modelYear.localeCompare(a.modelYear)
        ),
      };
    case finishCarTypesAction.SORT_FINISH_CAR_CAR_WORK_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.workOncar.localeCompare(a.workOncar)
        ),
      };
    case finishCarTypesAction.DELETE_FINISH_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car.VIN !== action.payload!.VIN),
      };
    default:
      return state;
  }
};
