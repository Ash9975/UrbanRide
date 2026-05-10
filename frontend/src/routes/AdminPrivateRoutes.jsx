import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../features/auth/useAuth";

const AdminPrivateRoutes = () => {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "admin"
    ? <Outlet />
    : <Navigate to="/" />;
};

export default AdminPrivateRoutes;