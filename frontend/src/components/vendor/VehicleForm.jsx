import { useState, useRef } from "react";
import { X, Upload, ImageIcon } from "lucide-react";

const VehicleForm = ({
  formData,
  handleSubmit,
  handleChange,
  loading,
}) => {

  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    // Create previews
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImagePreviews(previews);

    // Pass to parent handler
    const syntheticEvent = {
      target: {
        name: "images",
        files: e.target.files,
      },
    };
    handleChange(syntheticEvent);
  };

  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);

    // Create a new DataTransfer to update the files
    const dt = new DataTransfer();
    newPreviews.forEach((p) => dt.items.add(p.file));
    const syntheticEvent = {
      target: {
        name: "images",
        files: dt.files,
      },
    };
    handleChange(syntheticEvent);
  };

  const inputClass = "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition";
  const selectClass = "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition appearance-none cursor-pointer";
  const labelClass = "block mb-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider";

  return (

    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-5">
        <h2 className="text-lg font-black text-white">Vehicle Details</h2>
        <p className="text-gray-400 text-xs mt-1">Fill in your vehicle information to list it on Urban Ride</p>
      </div>

      <div className="p-6 space-y-8">

        {/* SECTION 1: BASIC INFO */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center text-[10px] font-black text-black">1</div>
            <h3 className="text-sm font-bold text-gray-800">Basic Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-3">
              <label className={labelClass}>Vehicle Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Mercedes Benz S Class"
                value={formData.title || ""}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Company *</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Mercedes"
                value={formData.company || ""}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Model *</label>
              <input
                type="text"
                name="model"
                placeholder="e.g. S Class"
                value={formData.model || ""}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Year</label>
              <input
                type="number"
                name="year"
                placeholder="e.g. 2024"
                min="1990"
                max="2030"
                value={formData.year || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: REGISTRATION & PRICING */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center text-[10px] font-black text-black">2</div>
            <h3 className="text-sm font-bold text-gray-800">Registration & Pricing</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Registration Number *</label>
              <input
                type="text"
                name="registrationNumber"
                placeholder="e.g. MH 31 AB 1234"
                value={formData.registrationNumber || ""}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Price Per Day (₹) *</label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 5999"
                min="1"
                value={formData.price || ""}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Base Package</label>
              <input
                type="text"
                name="basePackage"
                placeholder="e.g. Standard, Premium"
                value={formData.basePackage || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: SPECIFICATIONS */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center text-[10px] font-black text-black">3</div>
            <h3 className="text-sm font-bold text-gray-800">Specifications</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Fuel Type</label>
              <select
                name="fuelType"
                value={formData.fuelType || ""}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select fuel type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Transmission</label>
              <select
                name="transmission"
                value={formData.transmission || ""}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Seating Capacity</label>
              <input
                type="number"
                name="seats"
                placeholder="e.g. 4"
                min="1"
                max="10"
                value={formData.seats || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Car Type</label>
              <select
                name="carType"
                value={formData.carType || ""}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select car type</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="convertible">Convertible</option>
                <option value="luxury">Luxury</option>
                <option value="van">Van</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 4: LOCATION */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center text-[10px] font-black text-black">4</div>
            <h3 className="text-sm font-bold text-gray-800">Location</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>District *</label>
              <input
                type="text"
                name="district"
                placeholder="e.g. Nagpur"
                value={formData.district || ""}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Location / Area *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Maharashtra"
                value={formData.location || ""}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: DESCRIPTION */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center text-[10px] font-black text-black">5</div>
            <h3 className="text-sm font-bold text-gray-800">Description</h3>
          </div>

          <textarea
            name="description"
            placeholder="Describe your luxury vehicle — features, comfort, special amenities..."
            value={formData.description || ""}
            onChange={handleChange}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* SECTION 6: IMAGES */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center text-[10px] font-black text-black">6</div>
            <h3 className="text-sm font-bold text-gray-800">Vehicle Images</h3>
            <span className="text-[10px] text-gray-400 font-medium">Max 3 images</span>
          </div>

          {/* Upload area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-lime-400 hover:bg-lime-50/30 transition"
          >
            <Upload size={28} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm font-semibold text-gray-600">Click to upload images</p>
            <p className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 5MB each</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            name="images"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Image previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-28 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={12} className="text-white" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-1 text-center">
                    <span className="text-[9px] text-white font-medium">Image {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Existing images (for edit mode) */}
          {!formData.images?.length && imagePreviews.length === 0 && (
            <div className="flex items-center gap-2 mt-3 text-gray-400">
              <ImageIcon size={14} />
              <span className="text-[10px]">No images selected</span>
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white py-3 rounded-xl text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving Vehicle...
                </span>
              ) : (
                "Save Vehicle"
              )}
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            Your vehicle will be reviewed by admin before listing on the marketplace.
          </p>
        </div>

      </div>

    </form>
  );
};

export default VehicleForm;
