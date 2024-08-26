import { carsInWaitingSlice } from "./CarsInWaitingsSlice";

import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { serviceCarSlice } from "./ServiceCarSlice";
import { finishCarSlice } from "./FinishCarSlice";
import { carsWaitingAPI } from "../../pages/CarsWaitings/api/carsWaitingAPI";

const rootReducer = combineSlices(
  carsInWaitingSlice,
  serviceCarSlice,
  finishCarSlice,
  carsWaitingAPI,
);

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(carsWaitingAPI.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
