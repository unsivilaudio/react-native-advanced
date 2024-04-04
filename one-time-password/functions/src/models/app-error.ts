/**
 * Custom AppError class
 */
class AppError extends Error {
  public code = 500;
  /**
   * @constructor
   * @param {string} message - error message
   * @param {number} code - optional status code
   */
  constructor(public message: string, code?: number) {
    super(message);
    this.code = code || 500;
  }
}

export default AppError;
