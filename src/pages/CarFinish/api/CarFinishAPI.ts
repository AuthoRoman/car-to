import { z } from "zod";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cardFinish } from "../types";

const carFinishSchema = z.object({
  nameMaster: z.string(),
  id: z.number(),
  VIN: z.string(),
  region: z.string(),
  country: z.string(),
  manufacturer: z.string(),
  vehicleAttributes: z.string(),
  checkDigit: z.string(),
  modelYear: z.string(),
  assemblyPlant: z.string(),
  serialNumber: z.string(),
  problems: z.string(),
  date: z.string().optional(),
  recomm: z.string(),
  workOncar: z.string(),
});

export const carsFinishSchema = z.array(carFinishSchema);

export const carFinishAPI = createApi({
  reducerPath: "carFinishAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://16143fe3895a0193.mokky.dev" }),
  tagTypes: ["carFinishAPI"],
  endpoints: (build) => ({
    fetchCarsFinish: build.query<cardFinish[], string>({
      query: () => ({
        url: "/carsFinish",
      }),
      providesTags: ["carFinishAPI"],
    }),
    addCarFinish: build.mutation<cardFinish, cardFinish>({
      query: (car) => ({
        url: "/carsFinish",
        method: "POST",
        body: car,
      }),
    }),
    deleteCarFinish: build.mutation<cardFinish, number>({
      query: (id) => ({
        url: `/carsFinish/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
