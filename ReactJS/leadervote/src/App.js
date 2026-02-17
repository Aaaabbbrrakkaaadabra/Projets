import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/LanguageContext.js";
import LanguageSwitcher from "./components/LanguageSwitcher.js";
import './App.css';
import Home from "./pages/Home.js";
import Layout from "./pages/Layout.js";
import Leaders from "./pages/LeadersList.js";

function App() {
  return (

   
    <LanguageProvider>
      <LanguageSwitcher />
      <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/leaders" element={<Leaders />} />
        </Route>

      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
