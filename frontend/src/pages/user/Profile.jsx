import useAuth from "../../features/auth/useAuth";

const Profile = () => {

  const { user } =
    useAuth();

  return (

    <div className="min-h-screen bg-[#f3f3f5] py-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP PROFILE CARD */}
        <div className="bg-white rounded-[40px] p-10 shadow-sm mb-10">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* LEFT */}
            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* PROFILE IMAGE */}
              <div className="relative">

                <img
                  src={
                    user?.profilePicture ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="profile"
                  className="w-44 h-44 rounded-[35px] object-cover shadow-lg"
                />

                <div className="absolute -bottom-3 -right-3 bg-lime-400 text-black px-4 py-2 rounded-2xl font-bold shadow-md">

                  Active

                </div>

              </div>

              {/* USER INFO */}
              <div>

                <p className="uppercase tracking-[5px] text-lime-500 font-semibold mb-4">

                  Urban Ride Member

                </p>

                <h1 className="text-5xl font-black mb-4">

                  {user?.username}

                </h1>

                <p className="text-gray-500 text-xl mb-6">

                  {user?.email}

                </p>

                <div className="flex gap-4 flex-wrap">

                  {/* ROLE */}
                  <div className="bg-[#f5f5f5] px-6 py-3 rounded-2xl">

                    <p className="text-sm text-gray-500">

                      Role

                    </p>

                    <h3 className="font-bold text-xl capitalize">

                      {user?.role}

                    </h3>

                  </div>

                  {/* ROLE BADGE */}
                  <div className="bg-lime-100 px-6 py-3 rounded-2xl">

                    <p className="text-sm text-gray-600">

                      Status

                    </p>

                    <h3 className="font-bold text-xl">

                      {
                        user?.role === "vendor"
                          ? "Vendor Partner"
                          : user?.role === "admin"
                            ? "Platform Admin"
                            : "Premium User"
                      }

                    </h3>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE ROLE STATS */}
            <div className="grid grid-cols-2 gap-5">

              {/* USER ROLE */}
              {
                user?.role === "user" && (
                  <>

                    <div className="bg-black text-white rounded-3xl p-6 w-48">

                      <p className="text-gray-400 mb-3">

                        Total Bookings

                      </p>

                      <h2 className="text-5xl font-black">

                        12

                      </h2>

                    </div>

                    <div className="bg-lime-100 rounded-3xl p-6 w-48">

                      <p className="text-gray-600 mb-3">

                        Favorites

                      </p>

                      <h2 className="text-5xl font-black">

                        8

                      </h2>

                    </div>

                  </>
                )
              }

              {/* VENDOR ROLE */}
              {
                user?.role === "vendor" && (
                  <>

                    <div className="bg-black text-white rounded-3xl p-6 w-48">

                      <p className="text-gray-400 mb-3">

                        Vehicles

                      </p>

                      <h2 className="text-5xl font-black">

                        6

                      </h2>

                    </div>

                    <div className="bg-lime-100 rounded-3xl p-6 w-48">

                      <p className="text-gray-600 mb-3">

                        Revenue

                      </p>

                      <h2 className="text-4xl font-black">

                        ₹48K

                      </h2>

                    </div>

                  </>
                )
              }

              {/* ADMIN ROLE */}
              {
                user?.role === "admin" && (
                  <>

                    <div className="bg-black text-white rounded-3xl p-6 w-48">

                      <p className="text-gray-400 mb-3">

                        Total Users

                      </p>

                      <h2 className="text-5xl font-black">

                        240

                      </h2>

                    </div>

                    <div className="bg-lime-100 rounded-3xl p-6 w-48">

                      <p className="text-gray-600 mb-3">

                        Vendors

                      </p>

                      <h2 className="text-5xl font-black">

                        42

                      </h2>

                    </div>

                  </>
                )
              }

            </div>

          </div>

        </div>

        {/* DETAILS GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ACCOUNT INFO */}
          <div className="lg:col-span-2 bg-white rounded-[35px] p-8 shadow-sm">

            <h2 className="text-4xl font-black mb-8">

              Account Information

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* USERNAME */}
              <div className="bg-[#f5f5f5] rounded-3xl p-6">

                <p className="text-gray-500 mb-2">

                  Username

                </p>

                <h3 className="text-2xl font-bold">

                  {user?.username}

                </h3>

              </div>

              {/* EMAIL */}
              <div className="bg-[#f5f5f5] rounded-3xl p-6">

                <p className="text-gray-500 mb-2">

                  Email

                </p>

                <h3 className="text-2xl font-bold break-all">

                  {user?.email}

                </h3>

              </div>

              {/* ROLE */}
              <div className="bg-[#f5f5f5] rounded-3xl p-6">

                <p className="text-gray-500 mb-2">

                  Role

                </p>

                <h3 className="text-2xl font-bold capitalize">

                  {user?.role}

                </h3>

              </div>

              {/* STATUS */}
              <div className="bg-lime-100 rounded-3xl p-6">

                <p className="text-gray-600 mb-2">

                  Account Status

                </p>

                <h3 className="text-2xl font-bold">

                  Verified

                </h3>

              </div>

            </div>

          </div>

          {/* RIGHT ROLE PANEL */}
          <div className="bg-black text-white rounded-[35px] p-8 shadow-xl">

            {/* USER */}
            {
              user?.role === "user" && (
                <>
                  <p className="uppercase tracking-[4px] text-lime-400 font-semibold mb-5">

                    Premium Membership

                  </p>

                  <h2 className="text-5xl font-black leading-tight mb-6">

                    Luxury User

                  </h2>

                  <p className="text-gray-300 leading-relaxed mb-8">

                    Enjoy premium rides,
                    fast booking and elite
                    vehicle experiences.

                  </p>
                </>
              )
            }

            {/* VENDOR */}
            {
              user?.role === "vendor" && (
                <>
                  <p className="uppercase tracking-[4px] text-lime-400 font-semibold mb-5">

                    Vendor Partner

                  </p>

                  <h2 className="text-5xl font-black leading-tight mb-6">

                    Business Dashboard

                  </h2>

                  <p className="text-gray-300 leading-relaxed mb-8">

                    Manage your fleet,
                    bookings and rental
                    business performance.

                  </p>
                </>
              )
            }

            {/* ADMIN */}
            {
              user?.role === "admin" && (
                <>
                  <p className="uppercase tracking-[4px] text-lime-400 font-semibold mb-5">

                    Platform Control

                  </p>

                  <h2 className="text-5xl font-black leading-tight mb-6">

                    Admin Access

                  </h2>

                  <p className="text-gray-300 leading-relaxed mb-8">

                    Manage users,
                    vendors and oversee
                    complete platform
                    operations.

                  </p>
                </>
              )
            }

            <button className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-4 rounded-2xl font-bold transition w-full">

              Manage Account

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;