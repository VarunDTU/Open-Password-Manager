import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "plz provide an userName"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "plz provide an email"],
    unique: true,
  },
  password: { type: String, required: [true, "plz provide an password"] },
  MasterPassword: {
    type: Boolean,
    default: false,
  },
  role: { type: String, default: "user" },
  isVerified: { type: Boolean, default: false },
  forgotPasswordCode: { type: String, default: null },
  forgotPasswordCodeExpire: { type: Date, default: null },
  verifyCode: { type: String, default: null },
  verifyCodeExpire: { type: Date, default: null },
});
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
