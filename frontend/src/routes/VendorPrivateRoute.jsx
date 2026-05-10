import {
  Navigate,
  Outlet,
} from "react-router-dom";

import useAuth from "../features/auth/useAuth";

const VendorPrivateRoute = () => {

  const { user } = useAuth();

  // NOT LOGGED IN
  if (!user) {

    return (
      <Navigate to="/login" />
    );
  }

  // NOT VENDOR
  if (user.role !== "vendor") {

    return (
      <Navigate to="/" />
    );
  }

  // ALLOWED
  return <Outlet />;
};

export default VendorPrivateRoute;