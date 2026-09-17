import Booking from "../../models/BookingModel.js";
import Vehicle from "../../models/vehicleModel.js";

import { errorHandler } from "../../utils/error.js";

const ALLOWED_STATUSES = ["pending", "approved", "rejected", "completed"];

export const vendorBookings =
  async (req, res, next) => {

    try {

      if (!req.user) {

        return next(
          errorHandler(
            401,
            "Unauthorized"
          )
        );
      }

      const vendorId = req.user.id;

      const vehicles =
        await Vehicle.find({
          addedBy: vendorId,
          isDeleted: false,
        }).select("_id");

      if (!vehicles.length) {

        return res.status(200).json([]);
      }

      const vehicleIds =
        vehicles.map(
          (vehicle) =>
            vehicle._id
        );

      const bookings =
        await Booking.find({
          vehicleId: {
            $in: vehicleIds,
          },
        })
          .populate({
            path: "vehicleId",
            select:
              "title price images location",
          })
          .populate({
            path: "userId",
            select:
              "username email",
          })
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        bookings || []
      );

    } catch (error) {

      console.log(
        "VENDOR BOOKINGS ERROR:",
        error
      );

      next(
        errorHandler(
          500,
          "Failed to fetch vendor bookings"
        )
      );
    }
  };


  export const updateBookingStatus =
  async (req, res, next) => {

    try {

      const { status } =
        req.body;

      if (!ALLOWED_STATUSES.includes(status)) {
        return next(
          errorHandler(
            400,
            `Invalid status. Allowed: ${ALLOWED_STATUSES.join(", ")}`
          )
        );
      }

      const booking =
        await Booking.findById(req.params.id);

      if (!booking) {
        return next(
          errorHandler(404, "Booking not found")
        );
      }

      // Verify the booking belongs to a vehicle owned by this vendor
      const vehicle = await Vehicle.findById(booking.vehicleId);
      if (!vehicle || vehicle.addedBy.toString() !== req.user.id) {
        return next(
          errorHandler(403, "Not authorized to update this booking")
        );
      }

      booking.status = status;
      await booking.save();

      res.status(200).json(
        booking
      );

    } catch (error) {

      console.log(error);

      next(
        errorHandler(
          500,
          "Failed to update booking"
        )
      );
    }
  };
