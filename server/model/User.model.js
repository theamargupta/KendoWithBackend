import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);
