import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";

import Footer from "../components/common/Footer";

import { useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const hideNavbarFooter = ["/login", "/signup", "/admin"];
  return (

    <div className="min-h-screen bg-[#f3f3f5]">

      {
        !hideNavbarFooter.includes(location.pathname) && <Navbar />
      }

      <main className="max-w-7xl mx-auto px-4 py-6">

        <Outlet />

      </main>

      {
        !hideNavbarFooter.includes(location.pathname) && <Footer />
      }

    </div>
  );
};

export default MainLayout;