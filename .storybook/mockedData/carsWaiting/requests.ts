import { http, HttpResponse } from "msw";
import { mockedGetCarsWaitingList } from "./responses";

export const mockedCarsWaitingRequests = [
  http.get("https://16143fe3895a0193.mokky.dev/carsInWaiting", () => {
    return HttpResponse.json(mockedGetCarsWaitingList);
  }),
];

export const mockedCarsWaitingRequestsEmptyData = [
  http.get("https://16143fe3895a0193.mokky.dev/carsInWaiting", () => {
    return HttpResponse.json([]);
  }),
];
