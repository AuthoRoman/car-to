import { finishCarTypesAction, ICarFinishAction, ICarFinishState } from "../types";

 
  const initialState: ICarFinishState = {
    cars: [
      {
        id: 1,
        nameMaster: "Petr",
        VIN: "SJNFAAJ10Z1765675",
        region: "Европа",
        country: "Германия",
        manufacturer: "asdasd",
        vehicleAttributes: "asd",
        checkDigit: "asdasd",
        modelYear: "asdasd",
        assemblyPlant: "asdasd",
        serialNumber: "asdasd",
        recomm:'asd',
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
  
  export const finishCarReducer = (
    state = initialState,
    action: ICarFinishAction
  ): ICarFinishState => {
    switch (action.type) {
      case finishCarTypesAction.ADD_FINISH_CAR:
        return { ...state, cars: [...state.cars, action.payload] };
  
      default:
        return state;
    }
  };