import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICarsState } from "../types";
import { ICar } from "../../pages/CarsWaitings/types";

const initialState: ICarsState<ICar> = {
  cars: [],
  filteredItems: [],
};

export const carsInWaitingSlice = createSlice({
  name: "cars",
  initialState,

  reducers: {
    addCarsInWaiting(state: ICarsState<ICar>, action: PayloadAction<ICar>) {
      state.cars.push(action.payload);
    },
    editCarWaiting(state, action: PayloadAction<ICar>) {
      state.cars = state.cars.map((car) =>
        car.id === action.payload!.id
          ? Object.assign({}, car, action.payload)
          : car,
      );
    },

    findCarWaiting(state, action: PayloadAction<ICar>) {
      state.filteredItems = state.cars.filter(
        (x) =>
          x.carNumber
            .toLocaleLowerCase()
            .includes(action.payload!.carNumber.toLocaleLowerCase()) ||
          x.firstNameOwner
            .toLocaleLowerCase()
            .includes(action.payload!.carNumber.toLocaleLowerCase()) ||
          x.secondNameOwner
            .toLocaleLowerCase()
            .includes(action.payload!.carNumber.toLocaleLowerCase()),
      );
    },

    sortCarFirstNameOwnerUp(state) {
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        a.firstNameOwner.localeCompare(b.firstNameOwner),
      );
    },
    sortCarEmailUp(state) {
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        a.email.localeCompare(b.email),
      );
    },
    sortCarNumberAutoUp(state) {
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        a.carNumber.localeCompare(b.carNumber),
      );
    },
    sortCarTimeUp(state) {
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        a.date!.localeCompare(b.date!),
      );
    },
    sortCarFirstnameOwnerDown(state) {
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        b.firstNameOwner.localeCompare(a.firstNameOwner),
      );
    },
    sortCarEmailDown(state) {
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        b.email.localeCompare(a.email),
      );
    },
    sortCarNumberAutoDown(state) {
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        b.carNumber.localeCompare(a.carNumber),
      );
    },
    sortCarTimeDown(state) {
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        b.date!.localeCompare(a.date!),
      );
    },
    deleteWaitingCar(state, action) {
      state.cars = state.cars.filter((car) => car.VIN !== action.payload.VIN);
    },
  },
});

export const {
  addCarsInWaiting,
  deleteWaitingCar,
  editCarWaiting,
  findCarWaiting,
  sortCarEmailUp,
  sortCarEmailDown,
  sortCarFirstNameOwnerUp,
  sortCarFirstnameOwnerDown,
  sortCarNumberAutoUp,
  sortCarNumberAutoDown,
  sortCarTimeDown,
  sortCarTimeUp,
} = carsInWaitingSlice.actions;
