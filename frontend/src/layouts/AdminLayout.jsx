import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-xl mb-5">Admin Panel</h2>

        <div className="flex flex-col gap-3">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/vehicles">Vehicles</Link>
          <Link to="/admin/bookings">Bookings</Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-5">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;