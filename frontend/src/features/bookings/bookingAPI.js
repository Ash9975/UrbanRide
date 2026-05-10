import api from "../../services/api";

// CREATE BOOKING
export const createBooking = async (
  bookingData
) => {

  const response = await api.post(
    "/user/bookings",
    bookingData
  );

  return response.data;
};

// GET USER BOOKINGS
export const getUserBookings = async () => {

  const response = await api.get(
    "/user/bookings"
  );

  return response.data;
};