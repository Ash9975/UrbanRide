import express from "express";

import { verifyToken } from "../middleware/verifyUser.js";
import { isAdmin } from "../middleware/isAdmin.js";

import {
    adminAuth,
    adminProfile,
} from "../controllers/adminControllers/adminController.js";

import {
    signIn,
} from "../controllers/authController.js";

import {
    signOut,
} from "../controllers/userControllers/userController.js";

import {
    addVehicle,
    showVehicles,
    deleteVehicle,
    editVehicle,
} from "../controllers/adminControllers/dashboardController.js";

import {
    insertDummyData,
    getCarModelData,
} from "../controllers/adminControllers/masterCollectionController.js";

import {
    fetchVendorVehicleRequests,
    approveVendorVehicleRequest,
    rejectVendorVehicleRequest,
} from "../controllers/adminControllers/vendorVehilceRequests.js";

import {
    allBookings,
    changeStatus,
} from "../controllers/adminControllers/bookingsController.js";

import { multerUploads } from "../utils/multer.js";

const router = express.Router();


// ================= AUTH =================
router.post("/auth/login", signIn);
router.post("/auth/logout", verifyToken, isAdmin, signOut);
router.get("/auth/verify", verifyToken, isAdmin, adminAuth);


// ================= PROFILE =================
router.get("/profile", verifyToken, isAdmin, adminProfile);


// ================= VEHICLES =================
router.route("/vehicles")
    .post(verifyToken, isAdmin, multerUploads, addVehicle)
    .get(verifyToken, isAdmin, showVehicles);

router.route("/vehicles/:id")
    .put(verifyToken, isAdmin, editVehicle)
    .delete(verifyToken, isAdmin, deleteVehicle);


// ================= VENDOR REQUESTS =================
router.get("/vehicles/requests", verifyToken, isAdmin, fetchVendorVehicleRequests);
router.put("/vehicles/:id/approve", verifyToken, isAdmin, approveVendorVehicleRequest);
router.put("/vehicles/:id/reject", verifyToken, isAdmin, rejectVendorVehicleRequest);


// ================= BOOKINGS =================
router.get("/bookings", verifyToken, isAdmin, allBookings);
router.put("/bookings/:id/status", verifyToken, isAdmin, changeStatus);


// ================= MASTER DATA =================
router.post("/master/seed", verifyToken, isAdmin, insertDummyData);
router.get("/master", getCarModelData);

export default router;