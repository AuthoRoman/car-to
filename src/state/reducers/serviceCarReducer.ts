import { ICarserviceState, IServiceAction, serviceCarTypesAction } from "../types";

const initialState: ICarserviceState = {
  cars: [
    {
      id: 1,
      nameMaster:'Petr',
      VIN: "SJNFAAJ10Z1229675",
      region: "Европа",
      country: "Германия",
      manufacturer: "asdasd",
      vehicleAttributes: "asd",
      checkDigit: "asdasd",
      modelYear: "asdasd",
      assemblyPlant: "asdasd",
      serialNumber: "asdasd",
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

    default:
      return state;
  }
};
