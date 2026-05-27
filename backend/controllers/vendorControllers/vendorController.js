import User from "../../models/userModel.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import { errorHandler } from "../../utils/error.js";


const expireDate = new Date(Date.now() + 3600000);
export const vendorSignup = async (req, res, next) => {
  console.log(req.body);
  const {
    username, email, password, phoneNumber, address,
    businessName, drivingLicense, gstNumber, vehicleCount,
  } = req.body;

  try {

    // validation
    if (
      !username ||
      !email ||
      !password ||
      !phoneNumber ||
      !address
    ) {

      return next(
        errorHandler(400, "All fields are required")
      );
    }

    // existing user check
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return next(
        errorHandler(
          400,
          "User already exists"
        )
      );
    }


    const hashedPassword =
      bcryptjs.hashSync(
        password,
        10
      );


    const user =
      new User({
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        phoneNumber,
        address,
        isVendor: true,
        isUser: false,
        businessName, drivingLicense, gstNumber, vehicleCount,
      });

    await user.save();

    res.status(201).json({
      success: true,
      message:
        "Vendor registered successfully",
    });

  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const vendorSignin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.isVendor) {
      return next(errorHandler(404, "Vendor not found"));
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const accessToken = Jwt.sign(
      {
        id: user._id,
        isVendor: user.isVendor,
        isUser: user.isUser,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    const refreshToken = Jwt.sign(
      {
        id: user._id,
        isVendor: user.isVendor,
        isUser: user.isUser,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    await User.findByIdAndUpdate(
      user._id,
      {
        refreshToken,
      }
    );

    const { password: hashedPassword, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      user: rest,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    next(error);
  }
};

export const vendorSignout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user, {
      $unset: { refreshToken: "" },
    });

    res.status(200).json({ message: "Vendor signed out successfully" });
  } catch (error) {
    next(error);
  }
};

export const vendorGoogle = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user && !user.isVendor) {
      return next(errorHandler(409, "Email already used as user"));
    }

    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      user = new User({
        profilePicture: req.body.photo,
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
        isVendor: true,
        isUser: false,
      });

      await user.save();
    }

    const accessToken = Jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    const refreshToken = Jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      user: rest,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    next(error);
  }
};
