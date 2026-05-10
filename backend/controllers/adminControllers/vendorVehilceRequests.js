import Vehicle from "../../models/vehicleModel.js";
import User from "../../models/userModel.js";
import { errorHandler } from "../../utils/error.js";

export const fetchVendorVehicleRequests = async (req, res, next) => {
  try {
    const requests = await Vehicle.find({
      isAdminApproved: false,
      isDeleted: false,
      isRejected: false,
      isAdminAdded: false,
    }).populate("addedBy", "username email");

    res.status(200).json({
      success: true,
      data: requests || [],
    });

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

//approve Vendor reqest
export const approveVendorVehicleRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return next(errorHandler(404, "Vehicle not found"));
    }

    if (vehicle.isAdminApproved) {
      return next(errorHandler(400, "Vehicle already approved"));
    }

    vehicle.isAdminApproved = true;
    vehicle.isRejected = false;

    await vehicle.save();

    res.status(200).json({
      success: true,
      message: "Vehicle approved",
      data: vehicle,
    });

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

//Reject vendor vehicle
export const rejectVendorVehicleRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return next(errorHandler(404, "Vehicle not found"));
    }

    if (vehicle.isRejected) {
      return next(errorHandler(400, "Vehicle already rejected"));
    }

    vehicle.isRejected = true;
    vehicle.isAdminApproved = false;

    await vehicle.save();

    res.status(200).json({
      success: true,
      message: "Vehicle rejected",
      data: vehicle,
    });

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
