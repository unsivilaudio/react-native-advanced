const emailRegex = new RegExp(
  // eslint-disable-next-line max-len
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);
/**
 * Email validation function
 * @param {string} candidate - potential email string
 * @return {boolean}
 */
export function isEmail(candidate: string): boolean {
  return emailRegex.test(candidate);
}
