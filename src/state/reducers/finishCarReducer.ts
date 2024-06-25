import { finishCarTypesAction, ICarFinishAction, ICarFinishState } from "../types";

 
  const initialState: ICarFinishState = {
    cars: [
       
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