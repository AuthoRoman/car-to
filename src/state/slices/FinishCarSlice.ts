import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICarsState } from "../types";
import { cardFinish } from "../../pages/CarFinish/types";

const initialState: ICarsState<cardFinish> = {
  cars: [],
  filteredItems: [],
};

export const finishCarSlice = createSlice({
  name: "finishCars",
  initialState,
  reducers: {
    addFinishCar(state, action: PayloadAction<cardFinish>) {
      state.cars.push(action.payload);
    },
    findFinishCar(state, action: PayloadAction<cardFinish>) {
      state.filteredItems = [...state.cars].filter((x) =>
        x.nameMaster
          .toLocaleLowerCase()
          .includes(action.payload!.nameMaster.toLocaleLowerCase()),
      );
    },

    sortFinishCarNameMasterUp(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        a.nameMaster.localeCompare(b.nameMaster),
      );
    },
    sortFinishCarManufacturerUp(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        a.manufacturer.localeCompare(b.manufacturer),
      );
    },
    sortFinishCarModelYearUp(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        a.modelYear.localeCompare(b.modelYear),
      );
    },
    sortFinishCarWorkUp(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        a.workOncar.localeCompare(b.workOncar),
      );
    },
    sortFinishCarNameMasterDown(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        b.nameMaster.localeCompare(a.nameMaster),
      );
    },
    sortFinishCarManufacturerDown(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        b.manufacturer.localeCompare(a.manufacturer),
      );
    },
    sortFinishCarModelYearDown(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        b.modelYear.localeCompare(a.modelYear),
      );
    },
    sortFinishCarWorkDown(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        b.workOncar.localeCompare(a.workOncar),
      );
    },

    deleteFinishCar(state, action) {
      state.cars = state.cars.filter((car) => car.VIN !== action.payload!.VIN);
    },
  },
});

export const {
  addFinishCar,
  deleteFinishCar,
  findFinishCar,
  sortFinishCarManufacturerDown,
  sortFinishCarManufacturerUp,
  sortFinishCarModelYearDown,
  sortFinishCarModelYearUp,
  sortFinishCarNameMasterDown,
  sortFinishCarNameMasterUp,
  sortFinishCarWorkDown,
  sortFinishCarWorkUp,
} = finishCarSlice.actions;
