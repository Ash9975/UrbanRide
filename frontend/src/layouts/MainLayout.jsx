import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";

import Footer from "../components/common/Footer";

import { useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  return (

    <div className="min-h-screen bg-[#f3f3f5]">

      {
        location.pathname !== "/login" &&
        <Navbar />
      }

      <main className="max-w-7xl mx-auto px-4 py-6">

        <Outlet />

      </main>

      {
        location.pathname !== "/login" &&
        <Footer />
      }

    </div>
  );
};

export default MainLayout;