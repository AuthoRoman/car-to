import { carsInWaitingSlice } from "./CarsInWaitingsSlice";

import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { serviceCarSlice } from "./ServiceCarSlice";
import { finishCarSlice } from "./FinishCarSlice";

const rootReducer = combineSlices(
  carsInWaitingSlice,
  serviceCarSlice,
  finishCarSlice,
);

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
