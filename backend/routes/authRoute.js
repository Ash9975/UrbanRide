import express from "express";

import {
    signUp,
    signIn,
    google,
    refreshToken,
} from "../controllers/authController.js";

const router = express.Router();


// ================= AUTH =================
router.post("/signup", signUp);
router.post("/login", signIn);
router.post("/google", google);
router.post("/refreshToken", refreshToken);


export default router;