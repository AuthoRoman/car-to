import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICar } from "../../../state/types";

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
  }),
});
