import Booking from "../../models/BookingModel.js";
import Vehicle from "../../models/vehicleModel.js";
import { errorHandler } from "../../utils/error.js";

// book car
export const BookCar = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      vehicleId,
      pickupDate,
      dropOffDate,
      pickupLocation,
      dropOffLocation,
      totalPrice,
    } = req.body;

    if (!vehicleId || !pickupDate || !dropOffDate) {
      return next(errorHandler(400, "Missing required fields"));
    }

    const startDate = new Date(pickupDate);
    const endDate = new Date(dropOffDate);

    if (startDate >= endDate) {
      return next(errorHandler(400, "Invalid date range"));
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (
      !vehicle ||
      vehicle.isDeleted ||
      !vehicle.isAdminApproved ||
      vehicle.isRejected
    ) {
      return next(errorHandler(400, "Vehicle not available"));
    }

    // overlap check - only active bookings (pending or approved) block dates
    const overlapping = await Booking.find({
      vehicleId,
      status: { $in: ["pending", "approved"] },
      pickupDate: { $lt: endDate },
      dropOffDate: { $gt: startDate },
    });

    if (overlapping.length > 0) {
      return next(errorHandler(400, "Vehicle not available for selected dates"));
    }

    const booking = await Booking.create({
      userId,
      vehicleId,
      pickupDate: startDate,
      dropOffDate: endDate,
      pickUpLocation: pickupLocation,
      dropOffLocation: dropOffLocation,
      totalPrice,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Car booked successfully",
      data: booking,
    });

  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Booking failed"));
  }
};

//  Get all bookings of logged-in user
export const findBookingsOfUser = async (
  req,
  res,
  next
) => {

  try {

    const userId = req.user.id;

    const bookings = await Booking.find({
      userId,
    })
      .populate("vehicleId")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);

  } catch (error) {

    next(
      errorHandler(
        500,
        "Error fetching bookings"
      )
    );
  }
};

//  Get latest booking
export const latestBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const booking = await Booking.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate("vehicleId", "title price location images");

    res.status(200).json({
      success: true,
      data: booking,
    });

  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Booking fetch failed"));
  }
};

//  Get available vehicles
export const getAvailableVehicles = async (req, res, next) => {
  try {
    const { pickupDate, dropOffDate, district, location } = req.query;

    if (!pickupDate || !dropOffDate) {
      return next(errorHandler(400, "Dates required"));
    }

    const startDate = new Date(pickupDate);
    const endDate = new Date(dropOffDate);

    const bookedVehicles = await Booking.find({
      status: { $in: ["pending", "approved"] },
      pickupDate: { $lt: endDate },
      dropOffDate: { $gt: startDate },
    }).select("vehicleId");

    const bookedIds = bookedVehicles.map((b) => b.vehicleId);

    const filter = {
      _id: { $nin: bookedIds },
      isDeleted: false,
      isAdminApproved: true,
      isRejected: false,
    };

    if (district) filter.district = district;
    if (location) filter.location = location;

    const vehicles = await Vehicle.find(filter);

    res.status(200).json({
      success: true,
      data: vehicles,
    });

  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Error fetching available vehicles"));
  }
};

// Razorpay (future)
export const razorpayOrder = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Payment feature under development",
    });
  } catch (error) {
    next(errorHandler(500, "Razorpay error"));
  }
};
