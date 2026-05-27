import useAuth from "../../features/auth/useAuth";

const VendorProfile = () => {

  const { user } =
    useAuth();

  return (

    <div className="space-y-8">

      <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center gap-6">

          <img
            src={
              user?.profilePicture ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="w-28 h-28 rounded-[30px] object-cover border"
          />

          <div>

            <h1 className="text-4xl font-black mb-2">

              {user?.username}

            </h1>

            <p className="text-gray-500 mb-4">

              Premium Vendor Partner

            </p>

            <span className="bg-lime-100 text-lime-700 px-4 py-2 rounded-2xl font-semibold">

              Active Vendor

            </span>

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-[30px] p-6 shadow-sm">

          <h2 className="text-2xl font-black mb-6">

            Account Information

          </h2>

          <div className="space-y-5">

            <div>

              <p className="text-gray-500 text-sm mb-1">

                Email

              </p>

              <h3 className="font-semibold text-lg">

                {user?.email}

              </h3>

            </div>

            <div>

              <p className="text-gray-500 text-sm mb-1">

                Phone Number

              </p>

              <h3 className="font-semibold text-lg">

                {user?.phoneNumber}

              </h3>

            </div>

            <div>

              <p className="text-gray-500 text-sm mb-1">

                Address

              </p>

              <h3 className="font-semibold text-lg">

                {user?.address}

              </h3>

            </div>

          </div>

        </div>

        <div className="bg-black text-white rounded-[30px] p-6">

          <h2 className="text-2xl font-black mb-6">

            Vendor Information

          </h2>

          <div className="space-y-5">

            <div>

              <p className="text-gray-400 text-sm mb-1">

                Business Name

              </p>

              <h3 className="font-semibold text-lg">

                {
                  user?.businessName ||
                  "Not Added"
                }

              </h3>

            </div>

            <div>

              <p className="text-gray-400 text-sm mb-1">

                GST Number

              </p>

              <h3 className="font-semibold text-lg">

                {
                  user?.gstNumber ||
                  "Not Added"
                }

              </h3>

            </div>

            <div>

              <p className="text-gray-400 text-sm mb-1">

                Total Vehicles

              </p>

              <h3 className="font-semibold text-lg">

                {
                  user?.vehicleCount ||
                  0
                }

              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VendorProfile;