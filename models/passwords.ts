import mongoose from "mongoose";
const EncryptedPasswords = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  encryptedPasswordString: { type: Array<String>, required: true },
  iv: { type: Array<String>, required: true },
});
const UserEncryptedPasswords =
  mongoose.models.encryptedpasswords ||
  mongoose.model("encryptedpasswords", EncryptedPasswords);
export default UserEncryptedPasswords;
