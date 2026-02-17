import React from "react";
import { useLanguage } from "../components/LanguageContext.js";

const LanguageSwitcher = () => {
  const { setLang, lang } = useLanguage();

  return (
    <div className="language-switcher">
    <button onClick={() => setLang("fr")} disabled={lang === "fr"}>FR</button>
    <button onClick={() => setLang("en")} disabled={lang === "en"}>EN</button>
  </div>
  );
};

export default LanguageSwitcher;
