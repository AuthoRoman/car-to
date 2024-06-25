type VINInfo = {
  country: string;
  region: string;
  manufacturer: string;
  vehicleAttributes: string;
  checkDigit: string;
  modelYear: string;
  assemblyPlant: string;
  serialNumber: string;
};

const regions: { [key: string]: string } = {
  A: "Африка",
  B: "Африка",
  C: "Африка",
  D: "Африка",
  E: "Африка",
  F: "Африка",
  G: "Африка",
  H: "Африка",
  J: "Азия",
  K: "Азия",
  L: "Азия",
  M: "Азия",
  N: "Азия",
  P: "Азия",
  R: "Азия",
  S: "Европа",
  T: "Европа",
  U: "Европа",
  V: "Европа",
  W: "Европа",
  X: "Европа",
  Y: "Европа",
  Z: "Европа",
  "1": "Северная Америка",
  "2": "Северная Америка",
  "3": "Северная Америка",
  "4": "Северная Америка",
  "5": "Северная Америка",
  "6": "Океания",
  "7": "Океания",
  "8": "Южная Америка",
  "9": "Южная Америка",
};

const countries: { [key: string]: string } = {
  "1": "США",
  "2": "Канада",
  "3": "Мексика",
  J: "Япония",
  K: "Корея",
  S: "Великобритания",
  W: "Германия",
  X: "Россия",
  Z: "Италия",
  "9": "Бразилия",
};

const manufacturers: { [key: string]: string } = {
  "1G": "General Motors (США)",
  "1C": "Chrysler (США)",
  "1F": "Ford (США)",
  "1H": "Honda (США)",
  "1N": "Nissan (США)",
  "1Y": "Mazda (США)",
  "2G": "General Motors (Канада)",
  "2H": "Honda (Канада)",
  "2T": "Toyota (Канада)",
  "3G": "General Motors (Мексика)",
  "3H": "Honda (Мексика)",
  A21: "Audi AG (Германия)",
  "3N": "Nissan (Мексика)",
  JHM: "Honda (Япония)",
  JHL: "Honda (Япония)",
  JK: "Kawasaki (Япония)",
  JM1: "Mazda (Япония)",
  JN1: "Nissan (Япония)",
  JS: "Suzuki (Япония)",
  JT: "Toyota (Япония)",
  KL: "Daewoo (Корея)",
  KM: "Hyundai (Корея)",
  KN: "Kia (Корея)",
  SAL: "Land Rover (Великобритания)",
  SAR: "Rover (Великобритания)",
  SCC: "Lotus (Великобритания)",
  SCE: "DeLorean (Великобритания)",
  SCF: "Aston Martin (Великобритания)",
  TRU: "Audi (Германия)",
  TSM: "Suzuki (Германия)",
  VF: "Renault (Франция)",
  VF1: "Renault (Франция)",
  VW: "Volkswagen (Германия)",
  WAU: "Audi (Германия)",
  WBA: "BMW (Германия)",
  WDB: "Mercedes-Benz (Германия)",
  WDD: "Daimler AG (Германия)",
  WDF: "Mercedes-Benz (Германия)",
  WMX: "MCI (Германия)",
  WP0: "Porsche (Германия)",
  WV: "Volkswagen (Германия)",
  WVW: "Volkswagen (Германия)",
  XTA: "Lada/AutoVAZ (Россия)",
  YK1: "Saab (Швеция)",
  YS3: "Saab (Швеция)",
  YS4: "Scania (Швеция)",
  YT9: "Koenigsegg (Швеция)",
  YV1: "Volvo (Швеция)",
  YV4: "Volvo (Швеция)",
  ZAM: "Maserati (Италия)",
  ZAR: "Alfa Romeo (Италия)",
  ZDF: "Ferrari (Италия)",
  ZFF: "Ferrari (Италия)",
  ZHW: "Lamborghini (Италия)",
  "4T1": "Toyota (США)",
  "5FN": "Honda (США)",
  "5L": "Lincoln (США)",
};

const modelYears: { [key: string]: string } = {
  A: "1980",
  B: "1981",
  C: "1982",
  D: "1983",
  E: "1984",
  F: "1985",
  G: "1986",
  H: "1987",
  J: "1988",
  K: "1989",
  L: "1990",
  M: "1991",
  N: "1992",
  P: "1993",
  R: "1994",
  S: "1995",
  T: "1996",
  V: "1997",
  W: "1998",
  X: "1999",
  Y: "2000",
  "1": "2001",
  "2": "2002",
  "3": "2003",
  "4": "2004",
  "5": "2005",
  "6": "2006",
  "7": "2007",
  "8": "2008",
  "9": "2009",
};

  function decodeVIN(vin: string): VINInfo | null {
  if (vin.length !== 17) {
    return null;
  }

  const region = regions[vin[0]] || "Неизвестный регион";
  const country = countries[vin[0]] || "Неизвестная страна";
  const manufacturer =
    manufacturers[vin.substring(0, 3)] || "Неизвестный производитель";
  const vehicleAttributes =
    vin.substring(3, 8) ||
    "Неизвестная детализация по характеристикам автомобиля";
  const checkDigit = vin[8] || "Неизвестный год";
  const modelYear = modelYears[vin[9]] || "Неизвестный год";
  const assemblyPlant = vin[10] || "Неизвестный год";
  const serialNumber = vin.substring(11) || "Неизвестный сирийный номер";

  console.log(
    region,
    country,
    manufacturer,
    vehicleAttributes,
    checkDigit,
    modelYear,
    assemblyPlant,
    serialNumber
  );
  return {
    region,
    country,
    manufacturer,
    vehicleAttributes,
    checkDigit,
    modelYear,
    assemblyPlant,
    serialNumber,
  };
}
export default decodeVIN;
