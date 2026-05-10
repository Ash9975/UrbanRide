import express from "express";

import {
  vendorSignup,
  vendorSignin,
  vendorSignout,
  vendorGoogle,
} from "../controllers/vendorControllers/vendorController.js";

import {
  showVendorVehicles,
  vendorAddVehicle,
  vendorDeleteVehicle,
  vendorEditVehicle,
} from "../controllers/vendorControllers/vendorCrudController.js";

import { isVendor } from "../middleware/isVendor.js";

import {
  vendorBookings,
  updateBookingStatus,
} from "../controllers/vendorControllers/vendorBookingsController.js";

import { vendorAnalytics } from "../controllers/vendorControllers/vendorAnalyticsController.js";

import { multerMultipleUploads } from "../utils/multer.js";
import { verifyToken } from "../middleware/verifyUser.js";


const router = express.Router();


// ================= AUTH =================
router.post("/auth/signup", vendorSignup);
router.post("/auth/login", vendorSignin);
router.post("/auth/logout", verifyToken, vendorSignout);
router.post("/auth/google", vendorGoogle);


// ================= VEHICLES =================
router.post(
  "/vehicles",
  verifyToken,
  isVendor,
  multerMultipleUploads,
  vendorAddVehicle
);

router.get("/vehicles", verifyToken, isVendor, showVendorVehicles);
router.put("/vehicles/:id", verifyToken, isVendor, vendorEditVehicle);
router.delete("/vehicles/:id", verifyToken, isVendor, vendorDeleteVehicle);

router.get(
  "/analytics",
  verifyToken,
  vendorAnalytics
);


// ================= BOOKINGS =================
router.put( "/bookings/:id", verifyToken, isVendor, updateBookingStatus);
router.get("/bookings", verifyToken, vendorBookings);


export default router;