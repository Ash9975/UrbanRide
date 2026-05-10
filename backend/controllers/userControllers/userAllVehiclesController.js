import Vehicle from "../../models/vehicleModel.js";
import { errorHandler } from "../../utils/error.js";
import Booking from "../../models/BookingModel.js";

export const listAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({
      isDeleted: false,
      isAdminApproved: true,
    });

    if (!vehicles.length) {
      return next(errorHandler(404, "No vehicles found"));
    }

    res.status(200).json(vehicles);
  } catch (error) {
    next(errorHandler(500, "Error fetching vehicles"));
  }
};

//show one vehicle Detail to user
export const showVehicleDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle || vehicle.isDeleted) {
      return next(errorHandler(404, "Vehicle not found"));
    }

    res.status(200).json(vehicle);
  } catch (error) {
    next(errorHandler(500, "Error fetching vehicle details"));
  }
};

//check vehicle availabilitty
export const checkAvailability = async (req, res, next) => {
  try {
    const { pickupDate, dropOffDate, vehicleId } = req.body;

    if (!pickupDate || !dropOffDate || !vehicleId) {
      return next(errorHandler(400, "All fields are required"));
    }

    if (new Date(pickupDate) >= new Date(dropOffDate)) {
      return next(errorHandler(400, "Invalid date range"));
    }

    const overlappingBookings = await Booking.find({
      vehicleId,
      $or: [
        {
          pickupDate: { $lt: dropOffDate },
          dropOffDate: { $gt: pickupDate },
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      return next(errorHandler(400, "Vehicle not available"));
    }

    res.status(200).json({ message: "Vehicle is available" });

  } catch (error) {
    next(errorHandler(500, "Error checking availability"));
  }
};

//search car filter in homepage
export const searchCar = async (req, res, next) => {
  try {
    const { district, location } = req.query;

    const filter = {
      isDeleted: false,
      isAdminApproved: true,
    };

    if (district) {
      filter.district = {
        $regex: district,
        $options: "i",
      };
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    const vehicles = await Vehicle.find(filter);

    if (!vehicles.length) {
      return next(errorHandler(404, "No vehicles found"));
    }

    res.status(200).json(vehicles);

  } catch (error) {
    next(errorHandler(500, "Error searching vehicles"));
  }
};