import useAuth from "../../features/auth/useAuth";

const Profile = () => {

  const { user } =
    useAuth();

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-bold">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-bold text-red-500">
        User Not Found
      </div>
    );
  }

  const role =
    user?.role ||
    (user?.isVendor ? "vendor" : user?.isAdmin ? "admin" : "user");

  return (

    <div className="min-h-screen bg-[#f3f3f5] py-8">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* TOP PROFILE CARD */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-6">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="relative">
                <img
                  src={user?.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="profile"
                  className="w-28 h-28 rounded-2xl object-cover shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 bg-lime-400 text-black px-3 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                  Active
                </div>
              </div>

              <div>
                <p className="uppercase tracking-[3px] text-lime-500 font-semibold text-[10px] mb-2">
                  Urban Ride Member
                </p>
                <h1 className="text-2xl sm:text-3xl font-black mb-1">{user?.username}</h1>
                <p className="text-gray-500 text-sm mb-3">{user?.email}</p>

                <div className="flex gap-3 flex-wrap">
                  <div className="bg-[#f5f5f5] px-4 py-2 rounded-xl">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Role</p>
                    <h3 className="font-bold text-xs capitalize">{role}</h3>
                  </div>
                  <div className="bg-lime-100 px-4 py-2 rounded-xl">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Status</p>
                    <h3 className="font-bold text-xs">
                      {role === "vendor" ? "Vendor Partner" : role === "admin" ? "Platform Admin" : "Premium User"}
                    </h3>
                  </div>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-3">
              {role === "user" && (
                <>
                  <div className="bg-black text-white rounded-xl p-4 w-36">
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Total Bookings</p>
                    <h2 className="text-2xl font-black">12</h2>
                  </div>
                  <div className="bg-lime-100 rounded-xl p-4 w-36">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Favorites</p>
                    <h2 className="text-2xl font-black">8</h2>
                  </div>
                </>
              )}
              {role === "vendor" && (
                <>
                  <div className="bg-black text-white rounded-xl p-4 w-36">
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Vehicles</p>
                    <h2 className="text-2xl font-black">6</h2>
                  </div>
                  <div className="bg-lime-100 rounded-xl p-4 w-36">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Revenue</p>
                    <h2 className="text-xl font-black">₹48K</h2>
                  </div>
                </>
              )}
              {role === "admin" && (
                <>
                  <div className="bg-black text-white rounded-xl p-4 w-36">
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Total Users</p>
                    <h2 className="text-2xl font-black">240</h2>
                  </div>
                  <div className="bg-lime-100 rounded-xl p-4 w-36">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Vendors</p>
                    <h2 className="text-2xl font-black">42</h2>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>

        {/* DETAILS GRID */}
        <div className="grid lg:grid-cols-3 gap-5">

          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-black mb-5">Account Information</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#f5f5f5] rounded-xl p-4">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Username</p>
                <h3 className="text-sm font-bold">{user?.username}</h3>
              </div>
              <div className="bg-[#f5f5f5] rounded-xl p-4">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Email</p>
                <h3 className="text-sm font-bold break-all">{user?.email}</h3>
              </div>
              <div className="bg-[#f5f5f5] rounded-xl p-4">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Role</p>
                <h3 className="text-sm font-bold capitalize">{role}</h3>
              </div>
              <div className="bg-lime-50 rounded-xl p-4">
                <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Account Status</p>
                <h3 className="text-sm font-bold">Verified</h3>
              </div>
            </div>
          </div>

          <div className="bg-black text-white rounded-2xl p-6 shadow-xl">
            {role === "user" && (
              <>
                <p className="uppercase tracking-[3px] text-lime-400 font-semibold text-[10px] mb-3">Premium Membership</p>
                <h2 className="text-2xl font-black leading-tight mb-4">Luxury User</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">Enjoy premium rides, fast booking and elite vehicle experiences.</p>
              </>
            )}
            {role === "vendor" && (
              <>
                <p className="uppercase tracking-[3px] text-lime-400 font-semibold text-[10px] mb-3">Vendor Partner</p>
                <h2 className="text-2xl font-black leading-tight mb-4">Business Dashboard</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">Manage your fleet, bookings and rental business performance.</p>
              </>
            )}
            {role === "admin" && (
              <>
                <p className="uppercase tracking-[3px] text-lime-400 font-semibold text-[10px] mb-3">Platform Control</p>
                <h2 className="text-2xl font-black leading-tight mb-4">Admin Access</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">Manage users, vendors and oversee complete platform operations.</p>
              </>
            )}
            <button className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-xl text-sm font-bold transition w-full">
              Manage Account
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
