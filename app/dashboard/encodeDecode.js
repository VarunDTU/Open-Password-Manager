"use client";
import axios from "axios";
import crypto from "crypto";
export async function getMasterPassword() {
  try {
    const MasterPassword = await axios
      .get("/api/users/masterpassword")
      .then((response) => {
        //console.log(response.data);
        return response.data.data;
      });

    return MasterPassword;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
// Encryption function
function getKeyFromSecret(secretCode) {
  return crypto
    .createHash("sha256")
    .update(String(secretCode))
    .digest("base64")
    .substr(0, 32);
}

// Decryption function
export async function decrypt(encryptedText) {
  try {
    const Mpass = getMasterPassword().toString();
    const secretCode = getKeyFromSecret(Mpass);
    const iv = Buffer.from(encryptedText.iv, "hex");
    const encryptedTextBytes = Buffer.from(encryptedText.encryptedData, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(secretCode),
      iv
    );
    let decrypted = decipher.update(encryptedTextBytes);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch (error) {
    return { message: "error", error };
  }
}

export async function encrypt(text) {
  try {
    const Mpass = getMasterPassword().toString();
    const secretCode = getKeyFromSecret(Mpass);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(secretCode),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  } catch (error) {
    return { message: "error", error };
  }
}
