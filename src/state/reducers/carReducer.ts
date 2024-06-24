import { IAction, ICarsState, typesOfActionsCar } from "../types";

const initialState: ICarsState = {
  cars: [
    {
      id: 0,
      VIN: "XTA210930Y2696785",
      tel: "+7-999-999-99-99",
      email: "gogo@gmail.com",
      firstNameOwner: "Ivan",
      secondNameOwner: "Strogonov",
      numberOwners: 1,
      color: "red",
      carMileage: "100km",
      registration: "1 year",
      accidents: "false",

      problems: {
        engine: false,
        fuses: false,
        catalyst: false,
        generator: false,
        brakeSystem: false,
        windshieldWashers: false,
        alarm: false,
        steeringSystem: false,
      },
    },
    {
      id: 1,
      VIN: "XTA210968Y2696785",
      tel: "+7-999-999-99-99",
      email: "gogo@gmail.com",
      firstNameOwner: "Andrey",
      secondNameOwner: "Volkov",
      numberOwners: 1,
      color: "blue",
      carMileage: "700km",
      registration: "3 year",
      accidents: "false",

      problems: {
        engine: false,
        fuses: false,
        catalyst: true,
        generator: false,
        brakeSystem: true,
        windshieldWashers: false,
        alarm: false,
        steeringSystem: false,
      },
    },
  ],
};

export const carReducer = (
  state = initialState,
  action: IAction
): ICarsState => {
  switch (action.type) {
    case typesOfActionsCar.ADD_CAR:
      return { ...state, cars: [...state.cars, action.payload] };
    case typesOfActionsCar.DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car.VIN !== action.payload.VIN),
      };
    default:
      return state;
  }
};
