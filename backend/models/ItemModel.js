import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String, required: true },
  cover: { type: String, required: true },
  images: [String],
});

const itemModel = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default itemModel;
