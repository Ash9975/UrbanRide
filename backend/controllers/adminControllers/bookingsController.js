import Booking from "../../models/BookingModel.js";
import User from "../../models/userModel.js";
import { errorHandler } from "../../utils/error.js";

export const allBookings = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user || user.role !== "admin") {
      return next(errorHandler(403, "Admin access required"));
    }

    const bookings = await Booking.find()
      .populate("vehicleId")
      .populate("userId");

    if (!bookings.length) {
      return next(errorHandler(404, "No bookings found"));
    }

    res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (error) {
    next(error);
  }
};

//change bookings status
export const changeStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user || user.role !== "admin") {
      return next(errorHandler(403, "Admin access required"));
    }

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["booked", "completed", "cancelled"];

    if (!allowedStatus.includes(status)) {
      return next(errorHandler(400, "Invalid status value"));
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return next(errorHandler(404, "Booking not found"));
    }

    res.status(200).json({
      success: true,
      message: "Status updated",
      data: updatedBooking,
    });

  } catch (error) {
    next(error);
  }
};
