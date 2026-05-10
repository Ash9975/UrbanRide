import User from "../../models/userModel.js";
import { errorHandler } from "../../utils/error.js";
import bcryptjs from "bcryptjs";

// UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.user;

    if (userId !== req.params.id) {
      return next(errorHandler(403, "You can only update your account"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const updateData = {};

    if (req.body.username) updateData.username = req.body.username;

    if (req.body.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return next(errorHandler(400, "Email already in use"));
      }
      updateData.email = req.body.email;
    }

    if (req.body.profilePicture) {
      updateData.profilePicture = req.body.profilePicture;
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, "Password must be at least 6 characters"));
      }
      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user;

    if (userId !== req.params.id) {
      return next(errorHandler(403, "You can only delete your account"));
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    next(error);
  }
};

// SIGN OUT
export const signOut = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user, {
      $unset: { refreshToken: "" },
    });

    res.status(200).json({ message: "Signed out successfully" });

  } catch (error) {
    next(errorHandler(500, "Error in signout controller"));
  }
};