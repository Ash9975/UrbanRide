import mongoose from "mongoose";

const masterDataSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["location", "car"],
      required: true,
    },

    district: {
      type: String,
    },

    location: {
      type: String,
    },

    model: {
      type: String,
    },

    variant: {
      type: String,
    },

    brand: {
      type: String,
    },

    photoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);


// Location uniqueness
masterDataSchema.index(
  { district: 1, location: 1 },
  {
    unique: true,
    partialFilterExpression: { type: "location" }
  }
);

// Car uniqueness
masterDataSchema.index(
  { model: 1, variant: 1 },
  {
    unique: true,
    partialFilterExpression: { type: "car" }
  }
);

const MasterData = mongoose.model("MasterData", masterDataSchema);

export default MasterData;