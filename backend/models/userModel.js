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
      sparse: true, // allows multiple null values
    },

    address: {
      type: String,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profilePicture: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1740252117044-2af197eea287",
    },

    // 🔥 ROLE SYSTEM (IMPORTANT)
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
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