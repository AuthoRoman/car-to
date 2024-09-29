import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICarsState } from "../types";
import { cardService } from "../../pages/CarsService/types";

const initialState: ICarsState<cardService> = {
  cars: [],
  filteredItems: [],
};

export const serviceCarSlice = createSlice({
  name: "serviceCar",
  initialState,

  reducers: {
    addServiceCar(state, action: PayloadAction<cardService>) {
      state.cars.push(action.payload!);
    },

    findServiceCar(state, action: PayloadAction<cardService>) {
      state.filteredItems = [...state.cars].filter((x) =>
        x.nameMaster.includes(action.payload!.nameMaster),
      );
    },
    sortServiceCarNameMasterUp(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        a.nameMaster.localeCompare(b.nameMaster),
      );
    },
    sortServiceCarManufacturerUp(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        a.manufacturer.localeCompare(b.manufacturer),
      );
    },
    sortServiceCarModelYearUp(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        a.modelYear.localeCompare(b.modelYear),
      );
    },
    sortServiceCarDateUp(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        a.date!.localeCompare(b.date!),
      );
    },
    sortServiceCarNameMasterDown(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        b.nameMaster.localeCompare(a.nameMaster),
      );
    },
    sortServiceCarManufacturerDown(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        b.manufacturer.localeCompare(a.manufacturer),
      );
    },
    sortServiceCarModelYearDown(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        b.modelYear.localeCompare(a.modelYear),
      );
    },
    sortServiceCarDaterDown(state) {
      state.filteredItems = [...state.filteredItems!].sort((a, b) =>
        b.date!.localeCompare(a.date!),
      );
    },
    deleteServiceCar(state, action: PayloadAction<cardService>) {
      state.cars = state.cars.filter((car) => car.VIN !== action.payload.VIN);
    },
  },
});

export const {
  addServiceCar,
  deleteServiceCar,
  findServiceCar,
  sortServiceCarDateUp,
  sortServiceCarDaterDown,
  sortServiceCarManufacturerDown,
  sortServiceCarManufacturerUp,
  sortServiceCarModelYearDown,
  sortServiceCarModelYearUp,
  sortServiceCarNameMasterDown,
  sortServiceCarNameMasterUp,
} = serviceCarSlice.actions;
