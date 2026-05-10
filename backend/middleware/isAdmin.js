import { errorHandler } from "../utils/error.js";
import User from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user);

        if (!user || user.role !== "admin") {
            return next(errorHandler(403, "Admin access only"));
        }
        next();
    } catch (error) {
        next(error);
    }
};