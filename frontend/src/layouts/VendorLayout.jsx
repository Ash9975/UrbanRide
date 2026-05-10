import { Outlet } from "react-router-dom";

import VendorSidebar from "../components/vendor/VendorSidebar";

import VendorTopbar from "../components/vendor/VendorTopbar";

const VendorLayout = () => {

  return (

    <div className="bg-[#f3f3f5] min-h-screen">

      {/* SIDEBAR */}
      <VendorSidebar />

      {/* MAIN */}
      <div className="ml-64 flex flex-col min-h-screen">

        <VendorTopbar />

        <div className="p-8">

          <Outlet />

        </div>

      </div>

    </div>
  );
};

export default VendorLayout;