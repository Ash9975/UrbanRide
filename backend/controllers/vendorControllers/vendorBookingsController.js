import Booking from "../../models/BookingModel.js";
import Vehicle from "../../models/vehicleModel.js";

import { errorHandler } from "../../utils/error.js";

export const vendorBookings =
  async (req, res, next) => {

    try {

      // ✅ SAFETY CHECK
      if (!req.user) {

        return next(
          errorHandler(
            401,
            "Unauthorized"
          )
        );
      }

      const vendorId = req.user.id;

      // ✅ GET ALL VENDOR VEHICLES
      const vehicles =
        await Vehicle.find({
          addedBy: vendorId,
          isDeleted: false,
        }).select("_id");

      // ✅ IF NO VEHICLES
      if (!vehicles.length) {

        return res.status(200).json([]);
      }

      // ✅ EXTRACT IDS
      const vehicleIds =
        vehicles.map(
          (vehicle) =>
            vehicle._id
        );

      // ✅ GET BOOKINGS
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

      // ✅ ALWAYS RETURN ARRAY
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

      const booking =
        await Booking.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

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