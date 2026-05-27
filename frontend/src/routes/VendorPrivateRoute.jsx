import {
  Navigate,
  Outlet,
} from "react-router-dom";

import useAuth from "../features/auth/useAuth";

const VendorPrivateRoute = () => {

  const { user } = useAuth();

  // LOADING
  if (user === undefined) {

    return (

      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">

        Loading...

      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // NOT VENDOR
  const isVendor =
    user?.isVendor ||
    user?.role === "vendor";

  if (!isVendor) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ACCESS ALLOWED
  return <Outlet />;
};

export default VendorPrivateRoute;