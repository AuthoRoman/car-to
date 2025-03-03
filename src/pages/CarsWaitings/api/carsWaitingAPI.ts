import { z, ZodType } from "zod";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICar } from "../types";

const carWaitingSchema = z.object({
  id: z.number(),
  VIN: z.string(),
  tel: z.string(),
  email: z.string(),
  firstNameOwner: z.string(),
  secondNameOwner: z.string(),
  numberOwners: z.number(),
  color: z.string().optional(),
  carMileage: z.string(),
  carNumber: z.string(),
  registration: z.string().optional(),
  accidents: z.string().optional(),
  date: z.string().optional(),
  problems: z.string().optional(),
}) satisfies ZodType<ICar>;

export const carsWaitingSchema = z.array(carWaitingSchema);

export const carsWaitingAPI = createApi({
  reducerPath: "carsWaitingAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://16143fe3895a0193.mokky.dev" }),

  tagTypes: ["carsWaiting"],
  endpoints: (build) => ({
    fetchWaitingsCars: build.query<ICar[], string>({
      query: () => ({
        url: "/carsInWaiting",
      }),

      providesTags: ["carsWaiting"],
    }),
    createWaitingCar: build.mutation<ICar, ICar>({
      query: (car) => ({
        url: "/carsInWaiting",
        method: "POST",
        body: car,
      }),
      invalidatesTags: ["carsWaiting"],
    }),
    updateWaitingCar: build.mutation<ICar, ICar>({
      query: (car: ICar) => ({
        url: `/carsInWaiting/${car.id}`,
        method: "PATCH",
        body: car,
      }),
      invalidatesTags: ["carsWaiting"],
    }),
    deleteWaitingCar: build.mutation<ICar, number>({
      query: (id) => ({
        url: `/carsInWaiting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carsWaiting"],
    }),
  }),
});
