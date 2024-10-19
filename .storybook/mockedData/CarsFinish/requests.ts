import { http, HttpResponse } from "msw";
import { mockedGetCarsFinishList } from "./responses";

export const mockedCarsFinishRequests = [
  http.get("https://16143fe3895a0193.mokky.dev/carsFinish", () => {
    return HttpResponse.json(mockedGetCarsFinishList);
  }),
];

export const mockedCarsFinishRequestsEmptyData = [
  http.get("https://16143fe3895a0193.mokky.dev/carsFinish", () => {
    return HttpResponse.json([]);
  }),
];
