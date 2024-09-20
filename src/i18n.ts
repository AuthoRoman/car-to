import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./translation/en.json";
import ruTranslations from "./translation/ru.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  ru: {
    translation: ruTranslations,
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
