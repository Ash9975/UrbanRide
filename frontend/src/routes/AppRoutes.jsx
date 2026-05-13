import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// LAYOUTS
import MainLayout from "../layouts/MainLayout";
import VendorLayout from "../layouts/VendorLayout";
import AdminLayout from "../layouts/AdminLayout";

// PRIVATE ROUTES
import PrivateRoute from "./PrivateRoute";
import VendorPrivateRoute from "./VendorPrivateRoute";
import AdminPrivateRoutes from "./AdminPrivateRoutes";

// PUBLIC PAGES
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import PublicVehicles from "../pages/public/Vehicles";
import VehicleDetails from "../pages/public/VehicleDetails";

// USER PAGES
import Profile from "../pages/user/Profile";
import UserBookings from "../pages/user/Bookings";

// VENDOR PAGES
import VendorDashboard from "../pages/vendor/Dashboard";
import VendorVehicles from "../pages/vendor/Vehicles";
import AddVehicle from "../pages/vendor/AddVehicle";
import VendorBookings from "../pages/vendor/Bookings";
import EditVehicle from "../pages/vendor/EditVehicle";


// ADMIN PAGES
import AdminDashboard from "../pages/admin/Dashboard";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/vehicles"
            element={<PublicVehicles />}
          />

          <Route
            path="/vehicles/:id"
            element={<VehicleDetails />}
          />

        </Route>

        {/* USER PROTECTED ROUTES */}
        <Route element={<PrivateRoute />}>

          <Route element={<MainLayout />}>

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/bookings"
              element={<UserBookings />}
            />

          </Route>

        </Route>

        {/* VENDOR PROTECTED ROUTES */}
        <Route element={<VendorPrivateRoute />}>

          <Route
            path="/vendor"
            element={<VendorLayout />}
          >

            <Route
              path="dashboard"
              element={<VendorDashboard />}
            />

            <Route
              path="vehicles"
              element={<VendorVehicles />}
            />

            <Route
              path="add-vehicle"
              element={<AddVehicle />}
            />

            <Route
              path="bookings"
              element={<VendorBookings />}
            />

            <Route
              path="vehicles/edit/:id"
              element={<EditVehicle />}
            />

          </Route>

        </Route>

        {/* ADMIN PROTECTED ROUTES */}
        <Route element={<AdminPrivateRoutes />}>

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            <Route
              path="dashboard"
              element={<AdminDashboard />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;