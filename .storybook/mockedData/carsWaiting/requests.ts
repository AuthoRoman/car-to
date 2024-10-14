import { http, HttpResponse } from "msw";
import { mockedGetCarsWaitingList } from "./responses";

export const carsWaitingRequests = [
  http.get("https://16143fe3895a0193.mokky.dev/carsInWaiting", () => {
    return HttpResponse.json(mockedGetCarsWaitingList);
  }),
];

export const carsWaitingRequestsEmptyData = [
  http.get("https://16143fe3895a0193.mokky.dev/carsInWaiting", () => {
    return HttpResponse.json([]);
  }),
];
