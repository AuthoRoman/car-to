import {
  ICarserviceState,
  IServiceAction,
  serviceCarTypesAction,
} from "../types";

const initialState: ICarserviceState = {
  cars: [
    {
      id: 1,
      nameMaster: "Petr",
      VIN: "SJNFAAJ10Z1229675",
      region: "Европа",
      country: "Германия",
      manufacturer: "asdasd",
      vehicleAttributes: "asd",
      checkDigit: "asdasd",
      modelYear: "asdasd",
      assemblyPlant: "asdasd",
      serialNumber: "asdasd",
      problems: {
        engine: false,
        alarm: false,
        brakeSystem: true,
        catalyst: false,
        fuses: false,
        generator: true,
        steeringSystem: false,
        windshieldWashers: true,
      },
    },
  ],
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
