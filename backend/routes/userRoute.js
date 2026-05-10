import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";

import {
  updateUser,
  deleteUser,
  signOut
} from "../controllers/userControllers/userController.js";

import {
  listAllVehicles,
  showVehicleDetails,
  searchCar  
} from "../controllers/userControllers/userAllVehiclesController.js";
import {
  editUserProfile
} from "../controllers/userControllers/userProfileController.js";

import {
  BookCar,
  razorpayOrder,
  findBookingsOfUser,
  latestBooking
} from "../controllers/userControllers/userBookingController.js";

const router = express.Router();


// ================= AUTH =================
router.post("/logout", verifyToken, signOut);


// ================= ACCOUNT =================
router.put("/account/:id", verifyToken, updateUser);
router.delete("/account/:id", verifyToken, deleteUser);


// ================= PROFILE =================
router.put("/profile/:id", verifyToken, editUserProfile);


// ================= VEHICLES =================
router.get("/vehicles", listAllVehicles);

router.get("/vehicles/search", searchCar);

router.get("/vehicles/:id", showVehicleDetails);

// ================= BOOKINGS =================
router.post("/bookings", verifyToken, BookCar);
router.get("/bookings", verifyToken, findBookingsOfUser);
router.get("/bookings/latest", verifyToken, latestBooking);


// ================= PAYMENT (FUTURE) =================
router.post("/payment/razorpay", verifyToken, razorpayOrder);


export default router;