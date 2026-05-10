import Vehicle from "../../models/vehicleModel.js";
import Booking from "../../models/BookingModel.js";

export const vendorAnalytics = async (
  req,
  res,
  next
) => {

  try {

    const vendorId = req.user.id;

    // TOTAL VEHICLES
    const totalVehicles =
      await Vehicle.countDocuments({
        addedBy: vendorId,
        isDeleted: false,
      });

    // GET VENDOR VEHICLES
    const vehicles = await Vehicle.find({
      addedBy: vendorId,
    });

    const vehicleIds = vehicles.map(
      (vehicle) => vehicle._id
    );

    // TOTAL BOOKINGS
    const totalBookings =
      await Booking.countDocuments({
        vehicleId: {
          $in: vehicleIds,
        },
      });

    // REVENUE
    const bookings = await Booking.find({
      vehicleId: {
        $in: vehicleIds,
      },
    });

    const totalRevenue =
      bookings.reduce(
        (acc, booking) =>
          acc + booking.totalPrice,
        0
      );

    res.status(200).json({
      totalVehicles,
      totalBookings,
      totalRevenue,
    });

  } catch (error) {

    next(error);
  }
};