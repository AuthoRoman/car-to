import { http, HttpResponse } from "msw";
import { mockedGetCarsServiceList } from "./responses";

export const mockedCarsServiceRequests = [
  http.get("https://16143fe3895a0193.mokky.dev/carsService", () => {
    return HttpResponse.json(mockedGetCarsServiceList);
  }),
];

export const mockedCarsServiceRequestsEmptyData = [
  http.get("https://16143fe3895a0193.mokky.dev/carsService", () => {
    return HttpResponse.json([]);
  }),
];
