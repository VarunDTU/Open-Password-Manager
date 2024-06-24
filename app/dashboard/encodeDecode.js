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

    //console.log(MasterPassword);
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
    const data = await getMasterPassword();
    const Mpass = data.masterPasswordString.toString();
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
    return { message: "internal error or wrong masterpassword", error };
  }
}

export async function encrypt(text) {
  try {
    const data = await getMasterPassword();
    const Mpass = data.masterPasswordString.toString();

    const secretCode = getKeyFromSecret(Mpass);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(secretCode),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      password: encrypted.toString("hex"),
      userId: data.userId.toString(),
      iv: iv,
    };
  } catch (error) {
    return { message: "error ", error };
  }
}

export async function getpasswords() {
  const data = await axios.get("/api/users/passwords");
  //console.log(data.data.data.encryptedPasswordString.length);
  const passwords = [];

  for (let i = 0; i < data.data.data.encryptedPasswordString.length; i++) {
    const decryptedPassword = await decrypt({
      encryptedData: data.data.data.encryptedPasswordString[i],
      iv: data.data.data.iv[i],
    });
    passwords.push(decryptedPassword);
  }

  return passwords;
}