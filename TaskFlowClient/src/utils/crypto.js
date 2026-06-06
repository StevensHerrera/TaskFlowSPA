import bcrypt from "../lib/bcryptjs/index.js";

const SALT_ROUNDS = 10;

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(password, stored) {
  if (stored.startsWith("$2")) {
    return await bcrypt.compare(password, stored);
  }
  if (/^[a-f0-9]{64}$/.test(stored)) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("") === stored;
  }
  return password === stored;
}
