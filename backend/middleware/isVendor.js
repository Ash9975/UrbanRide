import { errorHandler } from "../utils/error.js";

import User from "../models/userModel.js";

export const isVendor = async (
  req,
  res,
  next
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      );

    if (
      !user ||
      !user.isVendor
    ) {

      return next(
        errorHandler(
          403,
          "Vendor access only"
        )
      );
    }

    next();

  } catch (error) {

    console.log(error);

    next(error);
  }
};