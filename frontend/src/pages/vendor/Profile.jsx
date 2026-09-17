import useAuth from "../../features/auth/useAuth";

const VendorProfile = () => {

  const { user } =
    useAuth();

  return (

    <div className="space-y-5">

      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center gap-5">

          <img
            src={user?.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="profile"
            className="w-24 h-24 rounded-2xl object-cover border shadow-sm"
          />

          <div>
            <h1 className="text-xl sm:text-2xl font-black mb-1">{user?.username}</h1>
            <p className="text-gray-500 text-sm mb-2">Premium Vendor Partner</p>
            <span className="bg-lime-100 text-lime-700 px-3 py-1 rounded-lg text-xs font-semibold">
              Active Vendor
            </span>
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-black mb-4">Account Information</h2>

          <div className="space-y-3">
            <div className="bg-[#f5f5f7] rounded-xl p-3">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Email</p>
              <h3 className="text-sm font-semibold">{user?.email}</h3>
            </div>
            <div className="bg-[#f5f5f7] rounded-xl p-3">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Phone Number</p>
              <h3 className="text-sm font-semibold">{user?.phoneNumber}</h3>
            </div>
            <div className="bg-[#f5f5f7] rounded-xl p-3">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Address</p>
              <h3 className="text-sm font-semibold">{user?.address}</h3>
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl p-5">
          <h2 className="text-base font-black mb-4">Vendor Information</h2>

          <div className="space-y-3">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Business Name</p>
              <h3 className="text-sm font-semibold">{user?.businessName || "Not Added"}</h3>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">GST Number</p>
              <h3 className="text-sm font-semibold">{user?.gstNumber || "Not Added"}</h3>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">Total Vehicles</p>
              <h3 className="text-sm font-semibold">{user?.vehicleCount || 0}</h3>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default VendorProfile;
