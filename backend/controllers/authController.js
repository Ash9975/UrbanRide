import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const signUp = async (
  req,
  res,
  next
) => {

  const {
    username,
    email,
    password,
    phoneNumber,
    address,

    role,

    businessName,
    drivingLicense,
    gstNumber,
    vehicleCount,

  } = req.body;

  try {

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return next(
        errorHandler(
          400,
          "User already exists"
        )
      );
    }

    const hashedPassword =
      bcryptjs.hashSync(password, 10);

    if (role === "vendor") {

      if (
        !businessName ||
        !drivingLicense ||
        !gstNumber
      ) {

        return next(
          errorHandler(
            400,
            "Vendor fields required"
          )
        );
      }
    }

    const newUser = new User({

      username,
      email,
      password: hashedPassword,

      phoneNumber,
      address,

      role: role === "vendor" ? "vendor" : "user",

      businessName:
        role === "vendor"
          ? businessName
          : "",

      drivingLicense:
        role === "vendor"
          ? drivingLicense
          : "",

      gstNumber:
        role === "vendor"
          ? gstNumber
          : "",

      vehicleCount:
        role === "vendor"
          ? vehicleCount
          : 0,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message:
        role === "vendor"
          ? "Vendor registered successfully"
          : "User registered successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//refreshTokens
export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(errorHandler(401, "No refresh token"));
  }

  try {
    const decoded = Jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return next(errorHandler(403, "Invalid refresh token"));
    }

    const newAccessToken = Jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(errorHandler(403, "Invalid refresh token"));
  }
};

export const signIn =
  async (req, res, next) => {

    const {
      email,
      password,
    } = req.body;

    try {

      const user =
        await User.findOne({
          email:
            email.toLowerCase(),
          role: "user",
        });

      if (!user) {

        return next(
          errorHandler(
            404,
            "User not found"
          )
        );
      }

      const validPassword =
        bcryptjs.compareSync(
          password,
          user.password
        );

      if (!validPassword) {

        return next(
          errorHandler(
            401,
            "Invalid credentials"
          )
        );
      }

      const accessToken =
        Jwt.sign(
          {
            id: user._id,
          },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "15m",
          }
        );

      const refreshToken =
        Jwt.sign(
          {
            id: user._id,
          },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "7d",
          }
        );

      await User.findByIdAndUpdate(
        user._id,
        {
          refreshToken,
        }
      );

      const {
        password:
        hashedPassword,
        ...rest
      } = user._doc;

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

export const google = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user && user.role !== "user") {
      return next(
        errorHandler(
          409,
          "Email already used as vendor"
        )
      );
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
        email: req.body.email,
        password: hashedPassword,
        role: "user",
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
