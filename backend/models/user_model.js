import mongoose from "mongoose";
const userschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    //image: { type: String, required: true },
    action: { type: Boolean },
  },
  { timestamps: true },
);

export const usercollection = mongoose.model("user", userschema);
