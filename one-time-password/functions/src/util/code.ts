const CODE_LENGTH = 5;
const chars = "0123456789abcdefABCDEF";

/**
 * Randomly select a character
 * @return {string} - random character
 */
function randomChar() {
  const rndIdx = Math.floor(Math.random() * chars.length);
  return chars[rndIdx];
}

/**
 * Build a hex string
 * @param {number} len - length of hex code
 * @return {string}
 */
function buildHex(len: number): string {
  return Array.from({length: len}, randomChar).join("");
}

/**
 * Generated new one-time-password
 * @return {string} - one time use code
 */
export function generateOTPCode() {
  return buildHex(CODE_LENGTH);
}
