import { createCarItem } from "../utils/createCarItem";

export const CARS_SERVICE_ITEMS = [
  createCarItem("Имя мастера", "nameMaster"),
  createCarItem("Автомобиль", "manufacturer"),
  createCarItem("Год изготовления", "modelYear"),
  createCarItem("Добавлен в обслуживание", "date"),
];
