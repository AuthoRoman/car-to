import { z } from "zod";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cardService } from "../types";

const carServiceSchema = z.object({
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
});

export const carsServiceSchema = z.array(carServiceSchema);

export const carsServiceAPI = createApi({
  reducerPath: "carsServiceAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://16143fe3895a0193.mokky.dev" }),
  tagTypes: ["carsService"],
  endpoints: (build) => ({
    fetchCarsService: build.query<cardService[], string>({
      query: () => ({
        url: "/carsService",
      }),
      providesTags: ["carsService"],
    }),
    createCarService: build.mutation<cardService, cardService>({
      query: (car) => ({
        url: "/carsService",
        method: "POST",
        body: car,
      }),
      invalidatesTags: ["carsService"],
    }),

    deleteCArSrvice: build.mutation<cardService, number>({
      query: (id) => ({
        url: `/carsService/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carsService"],
    }),
  }),
});
