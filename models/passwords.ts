import mongoose from "mongoose";
const EncryptedPasswords = new mongoose.Schema({
  userId: { type: String, required: true },
  encryptedPasswordString: { type: Array<String>, required: true },
});
const UserEncryptedPasswords =
  mongoose.models.users ||
  mongoose.model("encrytedPasswords", EncryptedPasswords);
export default UserEncryptedPasswords;
