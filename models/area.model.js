import mongoose from "mongoose";
const AreaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide an area name"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Area = mongoose.model("Area", AreaSchema);
