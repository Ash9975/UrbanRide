import User from "../../models/userModel.js";
import { errorHandler } from "../../utils/error.js";

export const editUserProfile = async (req, res, next) => {
  try {
    const userId = req.user; // from JWT

    if (userId !== req.params.id) {
      return next(errorHandler(403, "You can only edit your profile"));
    }

    const {
      username,
      email,
      phoneNumber,
      address,
    } = req.body;

    const updateData = {};

    if (username) updateData.username = username;

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return next(errorHandler(400, "Email already in use"));
      }
      updateData.email = email;
    }

    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (address) updateData.address = address;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};