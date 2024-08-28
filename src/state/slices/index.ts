import { carsInWaitingSlice } from "./CarsInWaitingsSlice";

import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { serviceCarSlice } from "./ServiceCarSlice";
import { finishCarSlice } from "./FinishCarSlice";
import { carsWaitingAPI } from "../../pages/CarsWaitings/api/carsWaitingAPI";
import { carsServiceAPI } from "../../pages/CarsService/api/CarsServiceAPI";
import { carFinishAPI } from "../../pages/CarFinish/api/CarFinishAPI";

const rootReducer = combineSlices(
  carsInWaitingSlice,
  serviceCarSlice,
  finishCarSlice,
  carsWaitingAPI,
  carsServiceAPI,
  carFinishAPI,
);

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(
        carsWaitingAPI.middleware,
        carsServiceAPI.middleware,
        carFinishAPI.middleware,
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
