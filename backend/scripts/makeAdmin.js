import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.updateOne(
  { email: "pimpalshendeashish249@gmail.com" },
  { $set: { role: "admin" } }
);

console.log("User promoted to admin");
process.exit();