import crypto from "crypto";

// Encryption function
export function encrypt(text: string, secretKey: string): string {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted; // Prepend the IV to the encrypted text
}

// Decryption function
export function decrypt(encryptedText: string, secretKey: string): string {
  const iv = Buffer.from(encryptedText.slice(0, 32), "hex"); // Extract the IV from the encrypted text
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let decrypted = decipher.update(encryptedText.slice(32), "hex", "utf8"); // Remove the IV from the encrypted text
  decrypted += decipher.final("utf8");
  return decrypted;
}

const decode = encrypt("hello", "secretKey");
console.log(decode);
