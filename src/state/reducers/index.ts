import { combineReducers } from "redux";
import { carReducer } from "./carReducer";
import { store } from "../store";
import { ServiceCarReducer } from "./serviceCarReducer";
import { finishCarReducer } from "./finishCarReducer";

export const rootReducer = combineReducers({
  cars: carReducer,
  carsInServ: ServiceCarReducer,
  carsInFinish: finishCarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store.dispatch;
