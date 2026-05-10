
import { errorHandler } from "../../utils/error.js";
import Vehicle from "../../models/vehicleModel.js";
import { cloudinary } from "../../utils/cloudinaryConfig.js";
import { base64Converter } from "../../utils/multer.js";

// vendor add vehicle

export const vendorAddVehicle = async (req, res, next) => {
  try {
    if (!req.body) return next(errorHandler(400, "Body required"));
    if (!req.files?.length) return next(errorHandler(400, "Images required"));

    const vendorId = req.user.id;

    const {
      registrationNumber,
      title,
      description,
      company,
      model,
      year,
      fuelType,
      transmission,
      seats,
      price,
      basePackage,
      location,
      district,
      carType,
    } = req.body;

    // Upload images
    const encodedFiles = base64Converter(req);

    const uploadedImages = await Promise.all(
      encodedFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.data, {
          public_id: file.filename,
        });
        return result.secure_url;
      })
    );

    const vehicle = await Vehicle.create({
      registrationNumber,
      title,
      description,
      company,
      model,
      year,
      fuelType,
      transmission,
      seats,
      price,
      basePackage,
      images: uploadedImages,
      location,
      district,
      carType,
      addedBy: vendorId,
      isAdminAdded: false,
      isAdminApproved: false,
      isDeleted: false,
    });

    res.status(201).json(vehicle);

  } catch (error) {
    console.log(error);
    next(errorHandler(500, error.message));
  }
};

export const vendorEditVehicle = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const vendorId = req.user.id;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return next(errorHandler(404, "Vehicle not found"));

    if (vehicle.addedBy.toString() !== vendorId) {
      return next(errorHandler(403, "Not allowed"));
    }

    // ✅ Only allow valid fields
    const {
      registrationNumber,
      title,
      description,
      company,
      model,
      year,
      fuelType,
      transmission,
      seats,
      price,
      basePackage,
      location,
      district,
      carType,
    } = req.body;

    const updateData = {
      registrationNumber,
      title,
      description,
      company,
      model,
      year,
      fuelType,
      transmission,
      seats,
      price,
      basePackage,
      location,
      district,
      carType,
      isAdminApproved: false, // re-approval needed
      isRejected: false,
    };

    // ✅ Handle image update (optional)
    if (req.files && req.files.length > 0) {
      const encodedFiles = base64Converter(req);

      const uploadedImages = await Promise.all(
        encodedFiles.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.data, {
            public_id: file.filename,
          });
          return result.secure_url;
        })
      );

      updateData.images = uploadedImages;
    }

    const updated = await Vehicle.findByIdAndUpdate(
      vehicleId,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    console.log(error);
    next(errorHandler(500, error.message));
  }
};

//delete vendor Vehcile soft delete
export const vendorDeleteVehicle = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const vendorId = req.user.id;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return next(errorHandler(404, "Vehicle not found"));

    if (vehicle.addedBy.toString() !== vendorId) {
      return next(errorHandler(403, "Not allowed"));
    }

    if (vehicle.isDeleted) {
      return next(errorHandler(400, "Vehicle already deleted"));
    }

    vehicle.isDeleted = true;
    await vehicle.save();

    res.status(200).json({
      message: "Vehicle deleted successfully",
      vehicleId,
    });

  } catch (error) {
    console.log(error);
    next(errorHandler(500, error.message));
  }
};

//show vendor vehicles
export const showVendorVehicles = async (
  req,
  res,
  next
) => {

  console.log(
    "SHOW VENDOR VEHICLES HIT"
  );

  try {

    const vendorId = req.user.id;

    console.log(vendorId);

    const vehicles =
      await Vehicle.find({
        addedBy: vendorId,
        isDeleted: false,
      });

    res.status(200).json(vehicles);

  } catch (error) {

    console.log(error);

    next(errorHandler(
      500,
      error.message
    ));
  }
};