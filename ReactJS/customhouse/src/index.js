import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import BlogDetails from "./pages/BlogDetails"
import SearchImage from "./pages/SearchImage"
import Polygones from "./pages/Polygones"
import TarifsRecharge from "./pages/TarifsRecharge"
import WarExplosion from "./pages/WarExplosion"
import NoPage from "./pages/NoPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="searchimage" element={<SearchImage />} />
          <Route path="polygones" element={<Polygones />} />
          <Route path="tarifsrecharge" element={<TarifsRecharge />} />
          <Route path="warexplosion" element={<WarExplosion />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
