import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en.json";
import tlTranslations from "../locales/tl.json";

/**
 * i18n configuration
 */
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      tl: {
        translation: tlTranslations,
      },
    },
    lng: localStorage.getItem("librosync_language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

