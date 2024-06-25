import {
  ICarserviceState,
  IServiceAction,
  serviceCarTypesAction,
} from "../types";

const initialState: ICarserviceState = {
  cars: [],
};

export const ServiceCarReducer = (
  state = initialState,
  action: IServiceAction
): ICarserviceState => {
  switch (action.type) {
    case serviceCarTypesAction.ADD_SERVICE_CAR:
      return { ...state, cars: [...state.cars, action.payload] };
    case serviceCarTypesAction.DELETE_SERVICE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car.VIN !== action.payload.VIN),
      };
    default:
      return state;
  }
};
