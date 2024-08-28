import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cardService } from "../../../state/types";

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
