import Navbar from "../components/Navbar.js";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </>
  );
}
