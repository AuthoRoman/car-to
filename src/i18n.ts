import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ruCoreTranslations from "./translation/ru.json";
import ruWaitingCars from "./pages/CarsWaitings/translation/localeCarsWaitingRU.json";
import ruServiceCars from "./pages/CarsService/translation/localeCarsServiceRU.json";
import ruFinishCars from "./pages/CarFinish/translation/localeCarsFinishRU.json";
import ruTranslatePopups from "./components/shared/Popups/translation/translationPopupsRU.json";

import enCoreTranslations from "./translation/en.json";
import enWaitingCars from "./pages/CarsWaitings/translation/localeCarsWaitingEN.json";
import enServiceCars from "./pages/CarsService/translation/localeCarsServiceEN.json";
import enFinishCars from "./pages/CarFinish/translation/localeCarsFinishEN.json";
import enTranslatePopups from "./components/shared/Popups/translation/translationPopupsEN.json";

const resources = {
  en: {
    translation: enCoreTranslations,
    translateWaitCar: enWaitingCars,
    translateServiceCar: enServiceCars,
    translateFinishCar: enFinishCars,
    translatePopups: enTranslatePopups,
  },
  ru: {
    translation: ruCoreTranslations,
    translateWaitCar: ruWaitingCars,
    translateServiceCar: ruServiceCars,
    translateFinishCar: ruFinishCars,
    translatePopups: ruTranslatePopups,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: "ru",
  debug: true,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
