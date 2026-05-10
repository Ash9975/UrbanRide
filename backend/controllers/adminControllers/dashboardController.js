import Vehicle from "../../models/vehicleModel.js";
import User from "../../models/userModel.js";
import { errorHandler } from "../../utils/error.js";
import { cloudinary } from "../../utils/cloudinaryConfig.js";
import { dataUri } from "../../utils/multer.js";

export const addVehicle = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user || user.role !== "admin") {
      return next(errorHandler(403, "Admin access required"));
    }

    if (!req.files?.length) {
      return next(errorHandler(400, "Images required"));
    }

    const fileDataUri = dataUri(req);

    const uploadedImages = await Promise.all(
      fileDataUri.map(async (cur) => {
        const result = await cloudinary.uploader.upload(cur.data, {
          public_id: cur.filename,
        });
        return result.secure_url;
      })
    );

    const newVehicle = await Vehicle.create({
      ...req.body,
      image: uploadedImages,
      isAdminAdded: true,
      isAdminApproved: true,
      isDeleted: false,
      created_at: Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      data: newVehicle,
    });

  } catch (error) {
    next(error);
  }
};

//show all vehicles to admin
export const showVehicles = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user || user.role !== "admin") {
      return next(errorHandler(403, "Admin access required"));
    }

    const vehicles = await Vehicle.find({ isDeleted: false });

    if (!vehicles.length) {
      return next(errorHandler(404, "No vehicles found"));
    }

    res.status(200).json({
      success: true,
      data: vehicles,
    });

  } catch (error) {
    next(error);
  }
};

//admin delete vehicle
export const deleteVehicle = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user ||  user.role !== "admin") {
      return next(errorHandler(403, "Admin access required"));
    }

    const { id } = req.params;

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!vehicle) {
      return next(errorHandler(404, "Vehicle not found"));
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};

//edit vehicle listed by admin
export const editVehicle = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user || user.role !== "admin") {
      return next(errorHandler(403, "Admin access required"));
    }

    const { id } = req.params;

    const updateData = {
      ...req.body,
      updated_at: Date.now(),
    };

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!vehicle) {
      return next(errorHandler(404, "Vehicle not found"));
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated",
      data: vehicle,
    });

  } catch (error) {
    next(error);
  }
};
