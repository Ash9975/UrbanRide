import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    company: {
      type: String,
    },

    model: {
      type: String,
    },

    year: {
      type: Number,
    },

    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid"],
    },

    transmission: {
      type: String,
      enum: ["manual", "automatic"],
    },

    seats: {
      type: Number,
    },

    price: {
      type: Number,
      required: true,
    },

    basePackage: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    carType: {
      type: String,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isAdminAdded: {
      type: Boolean,
      default: false,
    },

    isAdminApproved: {
      type: Boolean,
      default: false,
    },

    isRejected: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;