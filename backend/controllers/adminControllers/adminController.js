import User from "../../models/userModel.js";
import { errorHandler } from "../../utils/error.js";

export const adminAuth = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Admin verified successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const adminProfile = async (req, res, next) => {
  try {
    const adminId = req.user;

    const admin = await User.findById(adminId);

    if (!admin) {
      return next(errorHandler(404, "Admin not found"));
    }

    const { password, ...rest } = admin._doc;

    res.status(200).json({
      success: true,
      data: rest,
    });

  } catch (error) {
    next(error);
  }
};
