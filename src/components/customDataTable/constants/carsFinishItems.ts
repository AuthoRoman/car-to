import { createCarItem } from "../utils/createCarItem";

export const CARS_FINISH_ITEMS = [
  createCarItem("Имя мастера взявшего авто", "defaultStateSortNameMaster"),
  createCarItem("Автомобиль", "defaultStateSortManufacturer"),
  createCarItem("Год выпуска авто", "defaultStateSortModelYear"),
  createCarItem("Работа сделанная над автомобилем", "defaultStateSortWork"),
];
