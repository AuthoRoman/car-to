import {
  finishCarTypesAction,
  ICarFinishAction,
  ICarFinishState,
} from "../types";

const initialState: ICarFinishState = {
  cars: [],
};

export const finishCarReducer = (
  state = initialState,
  action: ICarFinishAction
): ICarFinishState => {
  switch (action.type) {
    case finishCarTypesAction.ADD_FINISH_CAR:
      return { ...state, cars: [...state.cars, action.payload] };
    case finishCarTypesAction.DELETE_FINISH_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car.VIN !== action.payload.VIN),
      };
    default:
      return state;
  }
};
