import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function VendorPrivateRoute() {
    const { currentUser, isLoading } = useSelector((state) => state.user);

    if (isLoading) return null; // or spinner

    return currentUser?.isVendor ? (
        <Outlet />
    ) : (
        <Navigate to="/vendorSignin" replace />
    );
}

export default VendorPrivateRoute;
