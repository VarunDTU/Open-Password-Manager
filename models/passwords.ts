import mongoose from "mongoose";
const EncryptedPasswords = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  encryptedPasswordString: { type: String, required: true },
});
const UserEncryptedPasswords =
  mongoose.models.users ||
  mongoose.model("encrytedPasswords", EncryptedPasswords);
export default UserEncryptedPasswords;
