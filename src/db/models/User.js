import mongoose from "mongoose";
const { Schema } = mongoose;
import "./Asset";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  assets: { type: [Schema.Types.ObjectId], ref: "Asset" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
