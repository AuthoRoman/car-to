import { useCallback, useEffect, useState } from "react";
import i18n from "../../../../i18n";
const useChangeLang = () => {
  const [lang, setLang] = useState("");

  const handlerChangeLang = useCallback(
    (newLang: "en" | "ru") => {
      setLang(newLang);
    },
    [lang],
  );

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [handlerChangeLang]);

  return {
    lang,
    handlerChangeLang,
  };
};

export default useChangeLang;
