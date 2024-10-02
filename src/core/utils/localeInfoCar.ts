export enum localCarInfo {
  firstNameOwner = "carInfo.firstNameOwner",
  secondNameOwner = "carInfo.secondNameOwner",
  fullNameOwner = "carInfo.fullNameOwner",
  tel = "carInfo.tel",
  numberOwners = "carInfo.numberOwners",
  carNumber = "carInfo.carNumber",
  date = "carInfo.date",
  email = "carInfo.email",
  VIN = "carInfo.VIN",
  accidents = "carInfo.accidents",
  carMileage = "carInfo.carMileage",
  manufacturer = "carInfo.manufacturer",
  registration = "carInfo.registration",
  checkDigit = "carInfo.checkDigit",
  country = "carInfo.country",
  color = "carInfo.color",
  serialNumber = "carInfo.serialNumber",
  region = "carInfo.region",
  assemblyPlant = "carInfo.assemblyPlant",
  accidentse = "carInfo.accidentse",
  modelYear = "carInfo.modelYear",
  nameMaster = "carInfo.nameMaster",
  vehicleAttributes = "carInfo.vehicleAttributes",
  problems = "carInfo.problems",
  workOncar = "carInfo.workOncar",
  recomm = "carInfo.recomm",
}

export const getLocaleCarInfo = (typeId: keyof typeof localCarInfo) => {
  return localCarInfo[typeId];
};
