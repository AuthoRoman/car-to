import {
  ICarserviceState,
  IServiceAction,
  serviceCarTypesAction,
} from "../types";

const initialState: ICarserviceState = {
  cars: [],
  filteredItems: [],
};

export const ServiceCarReducer = (
  state = initialState,
  action: IServiceAction
): ICarserviceState => {
  switch (action.type) {
    case serviceCarTypesAction.ADD_SERVICE_CAR:
      return { ...state, cars: [...state.cars, action.payload!] };
    case serviceCarTypesAction.FIND_SERVICE_CAR:
      return {
        ...state, 
        filteredItems: [...state.cars].filter((x) => x.nameMaster.includes(action.payload!.nameMaster))
      };
      case serviceCarTypesAction.SORT_SERVICE_CAR_CAR_NAME_MASTER_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.nameMaster.localeCompare(b.nameMaster)
        ),
      };
    case serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MANUFACTURER_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.manufacturer.localeCompare(b.manufacturer)
        ),
      };
    case serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MODEL_YEAR_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.modelYear.localeCompare(b.modelYear)
        ),
      };
    case serviceCarTypesAction.SORT_SERVICE_CAR_CAR_DATE_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.date!.localeCompare(b.date!)
        ),
      };
    case serviceCarTypesAction.SORT_SERVICE_CAR_CAR_NAME_MASTER_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.nameMaster.localeCompare(a.nameMaster)
        ),
      };
    case serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MANUFACTURER_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.manufacturer.localeCompare(a.manufacturer)
        ),
      };
    case serviceCarTypesAction.SORT_SERVICE_CAR_CAR_MODEL_YEAR_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.modelYear.localeCompare(a.modelYear)
        ),
      };
    case serviceCarTypesAction.SORT_SERVICE_CAR_CAR_DATE_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.date!.localeCompare(a.date!)
        ),
      };
    case serviceCarTypesAction.DELETE_SERVICE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car.VIN !== action.payload!.VIN),
      };
    default:
      return state;
  }
};
