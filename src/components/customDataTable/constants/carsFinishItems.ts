// Для того что бы не дублировать создание единообразных данных можно использовать функции для создания данных.

// const createCarItem = (title, defaultName) => ({
//   title,
//   state: false,
//   arrowState: false,
//   defaultName,
// });

// export const CARS_FINISH_ITEMS = [
//   createCarItem("Имя мастера взявшего авто", "defaultStateSortNameMaster"),
//   createCarItem("Автомобиль", "defaultStateSortManufacturer"),
//   createCarItem("Год выпуска авто", "defaultStateSortModelYear"),
//   createCarItem("Работа сделанная над автомобилем", "defaultStateSortWork"),
// ];

export const CARS_FINISH_ITEMS = [
  {
    title: "Имя мастера взявшего авто",
    state: false,
    arrowState: false,
    defaultName: "defaultStateSortNameMaster",
  },
  {
    title: "Автомобиль",
    state: false,
    arrowState: false,
    defaultName: "defaultStateSortManufacturer",
  },
  {
    title: "Год выпуска авто",
    state: false,
    arrowState: false,
    defaultName: "defaultStateSortModelYear",
  },
  {
    title: "Работа сделанная над автомобилем",
    state: false,
    arrowState: false,
    defaultName: "defaultStateSortWork",
  },
];
