import {
  Navigate,
  Outlet,
} from "react-router-dom";

import useAuth from "../features/auth/useAuth";

const PrivateRoute = () => {

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

  // ALLOWED
  return <Outlet />;
};

export default PrivateRoute;