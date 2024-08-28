import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cardFinish } from "../../../state/types";

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
