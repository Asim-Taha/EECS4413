import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timeseries: true }
);

const User = mongoose.model("User", UserShema);

export default User;
