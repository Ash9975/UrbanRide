import { Outlet } from "react-router-dom";

import VendorSidebar from "../components/vendor/VendorSidebar";

import VendorTopbar from "../components/vendor/VendorTopbar";

import { useState } from "react";

const VendorLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="bg-[#f3f3f5] min-h-screen">

      <VendorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="lg:ml-64 flex flex-col min-h-screen">

        <VendorTopbar setSidebarOpen={setSidebarOpen} />

        <div className="p-5 sm:p-6 lg:p-8">

          <Outlet />

        </div>

      </div>

    </div>
  );
};

export default VendorLayout;
