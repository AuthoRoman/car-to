import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICar } from "../../pages/CarsWaitings/types";

const initialState: ICar = {
  id: 0,
  VIN: "",
  tel: "",
  email: "",
  firstNameOwner: "",
  secondNameOwner: "",
  numberOwners: 1,
  color: "",
  carMileage: "",
  carNumber: "",
  registration: "",
  accidents: "",
  problems: "",
};

export const currentCarSlice = createSlice({
  name: "currentCar",
  initialState,
  reducers: {
    setNewCar: (state, action: PayloadAction<ICar>) => {
      return (state = { ...state, ...action });
    },
  },
});

export const { setNewCar } = currentCarSlice.actions;
