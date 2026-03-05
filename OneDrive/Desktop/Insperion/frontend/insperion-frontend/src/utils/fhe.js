import { Relayer } from "relayer-sdk";

export const relayer = new Relayer("https://relayer.fhevm.dev");

/**
 * Encrypt a 64-bit number for FHEVM.
 * @param {number} value
 */
export async function encryptValue(value) {
  return await relayer.encrypt64(value);
}

/**
 * Decrypt a ciphertext string from FHEVM.
 * @param {string} ciphertext
 */
export async function decryptValue(ciphertext) {
  return await relayer.decrypt64(ciphertext);
}
