import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getUserRoleFlags } from "./utils/authHelpers";

function PrivateRoute() {
  const { user } = useSelector((state) => state.user);
  const { isUser } = getUserRoleFlags(user);

  return isUser ? <Outlet /> : <Navigate to="/signin" />;
}

export const PrivateSignin = () => {
  const { user } = useSelector((state) => state.user);
  const { isAdmin, isVendor, isLoggedIn } = getUserRoleFlags(user);

  if (!isLoggedIn) return <Outlet />;

  if (isAdmin) return <Navigate to="/adminDashboard" />;
  if (isVendor) return <Navigate to="/vendorDashboard" />;

  return <Navigate to="/" />;
};

export default PrivateRoute;
