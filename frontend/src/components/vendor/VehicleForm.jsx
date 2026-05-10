const VehicleForm = ({
  formData,
  handleSubmit,
  handleChange,
  loading,
}) => {

  return (

    <div className="min-h-screen bg-[#f3f3f5] p-6">

      <div className="max-w-6xl mx-auto bg-white rounded-[40px] overflow-hidden shadow-sm grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="relative hidden lg:flex flex-col justify-between p-12 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop')",
          }}
        >

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10">

            <h1 className="text-5xl font-black text-white leading-tight">

              Add Your
              <br />

              Luxury Vehicle

            </h1>

            <p className="text-gray-200 mt-6 text-lg max-w-md">

              Expand your premium
              fleet and start getting
              bookings from customers
              across Urban Ride.

            </p>

          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl text-white">

              <h2 className="text-3xl font-black">

                24/7

              </h2>

              <p className="text-gray-200">

                Booking Access

              </p>

            </div>

            <div className="bg-lime-400 p-5 rounded-3xl">

              <h2 className="text-3xl font-black">

                Premium

              </h2>

              <p>

                Vendor Listing

              </p>

            </div>

          </div>

        </div>

        {/* FORM SIDE */}
        <div className="p-8 lg:p-12 overflow-y-auto">

          <div className="mb-10">

            <h1 className="text-5xl font-black mb-4">

              Vehicle Details

            </h1>

            <p className="text-gray-500 text-lg">

              Enter your luxury vehicle
              information to list it on
              Urban Ride marketplace.

            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* TITLE */}
            <div>

              <label className="block mb-2 font-semibold">

                Vehicle Title

              </label>

              <input
                type="text"
                name="title"
                placeholder="Mercedes Benz S Class"
                value={
                  formData.title || ""
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                required
              />

            </div>

            {/* COMPANY + MODEL */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="block mb-2 font-semibold">

                  Company

                </label>

                <input
                  type="text"
                  name="company"
                  placeholder="Mercedes"
                  value={
                    formData.company ||
                    ""
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                  required
                />

              </div>

              <div>

                <label className="block mb-2 font-semibold">

                  Model

                </label>

                <input
                  type="text"
                  name="model"
                  placeholder="S Class"
                  value={
                    formData.model || ""
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                  required
                />

              </div>

            </div>

            {/* REGISTRATION + PRICE */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="block mb-2 font-semibold">

                  Registration Number

                </label>

                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="MH 31 AB 1234"
                  value={
                    formData.registrationNumber ||
                    ""
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                  required
                />

              </div>

              <div>

                <label className="block mb-2 font-semibold">

                  Price Per Day

                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="5999"
                  value={
                    formData.price || ""
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                  required
                />

              </div>

            </div>

            {/* DISTRICT + LOCATION */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="block mb-2 font-semibold">

                  District

                </label>

                <input
                  type="text"
                  name="district"
                  placeholder="Nagpur"
                  value={
                    formData.district ||
                    ""
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                  required
                />

              </div>

              <div>

                <label className="block mb-2 font-semibold">

                  Location

                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Maharashtra"
                  value={
                    formData.location ||
                    ""
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-lime-400"
                  required
                />

              </div>

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block mb-2 font-semibold">

                Vehicle Description

              </label>

              <textarea
                name="description"
                placeholder="Describe your luxury vehicle..."
                value={
                  formData.description ||
                  ""
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 h-36 outline-none focus:ring-2 focus:ring-lime-400"
                required
              />

            </div>

            {/* IMAGE */}
            <div>

              <label className="block mb-2 font-semibold">

                Upload Vehicle Images

              </label>

              <input
                type="file"
                multiple
                name="images"
                onChange={
                  handleChange
                }
                className="w-full border border-dashed border-gray-300 bg-gray-50 rounded-2xl px-5 py-5"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white py-5 rounded-2xl text-lg font-semibold transition"
            >

              {
                loading
                  ? "Saving Vehicle..."
                  : "Save Vehicle"
              }

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default VehicleForm;