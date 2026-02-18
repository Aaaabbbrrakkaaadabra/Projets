import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../src/pages/Layout"
import Home from "../src/pages/Home"
import Invoices from "../src/pages/Invoices"
import Devis from "../src/pages/Devis"
import Settings from "./pages/Settings"
import NoPage from "../src/pages/NoPage"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="devis" element={<Devis />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
