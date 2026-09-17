const VehicleForm = ({
  formData,
  handleSubmit,
  handleChange,
  loading,
}) => {

  return (

    <div className="min-h-screen bg-[#f3f3f5]">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-sm grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="relative hidden lg:flex flex-col justify-between p-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10">
            <h1 className="text-3xl font-black text-white leading-tight">
              Add Your<br />Luxury Vehicle
            </h1>
            <p className="text-gray-200 mt-4 text-sm max-w-sm">
              Expand your premium fleet and start getting bookings from customers across Urban Ride.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
              <h2 className="text-lg font-black">24/7</h2>
              <p className="text-gray-200 text-xs">Booking Access</p>
            </div>
            <div className="bg-lime-400 p-4 rounded-xl">
              <h2 className="text-lg font-black">Premium</h2>
              <p className="text-xs">Vendor Listing</p>
            </div>
          </div>

        </div>

        {/* FORM SIDE */}
        <div className="p-6 lg:p-8 overflow-y-auto max-h-screen">

          <div className="mb-6">
            <h1 className="text-2xl font-black mb-2">Vehicle Details</h1>
            <p className="text-gray-500 text-sm">
              Enter your luxury vehicle information to list it on Urban Ride marketplace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block mb-1.5 text-sm font-semibold">Vehicle Title</label>
              <input type="text" name="title" placeholder="Mercedes Benz S Class" value={formData.title || ""} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-semibold">Company</label>
                <input type="text" name="company" placeholder="Mercedes" value={formData.company || ""} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-semibold">Model</label>
                <input type="text" name="model" placeholder="S Class" value={formData.model || ""} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-semibold">Registration Number</label>
                <input type="text" name="registrationNumber" placeholder="MH 31 AB 1234" value={formData.registrationNumber || ""} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-semibold">Price Per Day</label>
                <input type="number" name="price" placeholder="5999" value={formData.price || ""} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-semibold">District</label>
                <input type="text" name="district" placeholder="Nagpur" value={formData.district || ""} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-semibold">Location</label>
                <input type="text" name="location" placeholder="Maharashtra" value={formData.location || ""} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400" required />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-semibold">Vehicle Description</label>
              <textarea name="description" placeholder="Describe your luxury vehicle..." value={formData.description || ""} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 h-24 text-sm outline-none focus:ring-2 focus:ring-lime-400 resize-none" required />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-semibold">Upload Vehicle Images</label>
              <input type="file" multiple name="images" onChange={handleChange} className="w-full border border-dashed border-gray-300 bg-gray-50 rounded-xl px-4 py-3 text-sm" />
            </div>

            <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold transition">
              {loading ? "Saving Vehicle..." : "Save Vehicle"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default VehicleForm;
