import { IAction, ICarsState, typesOfActionsCar } from "../types";

const initialState: ICarsState = {
  cars: [],
};

export const carReducer = (
  state = initialState,
  action: IAction
): ICarsState => {
  switch (action.type) {
    case typesOfActionsCar.ADD_CAR:
      return { ...state, cars: [...state.cars, action.payload] };

    case typesOfActionsCar.EDIT_CAR:
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.VIN === action.payload.VIN
            ? Object.assign({}, car, action.payload)
            : car
        ),
      };

    case typesOfActionsCar.DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car.VIN !== action.payload.VIN),
      };
    default:
      return state;
  }
};
