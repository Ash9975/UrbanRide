import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profilePicture: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },

    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },

    // VENDOR DETAILS
    businessName: {
      type: String,
      default: "",
    },

    drivingLicense: {
      type: String,
      default: "",
    },

    gstNumber: {
      type: String,
      default: "",
    },

    vehicleCount: {
      type: Number,
      default: 0,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;