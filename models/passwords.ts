import mongoose from "mongoose";
const EncryptedPasswords = new mongoose.Schema({
  encryptedUserId: { type: String, required: true },
  encryptedPasswordString: { type: String, required: true },
});
const UserEncryptedPasswords =
  mongoose.models.users ||
  mongoose.model("encrytedPasswords", EncryptedPasswords);
export default UserEncryptedPasswords;
