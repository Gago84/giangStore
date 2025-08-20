// src/utils.js

/**
 * Validate Vietnamese phone numbers.
 * Accepts formats: 09xxxxxxxx, 03xxxxxxxx, +849xxxxxxxx, etc.
 * Returns true if valid, false otherwise.
 */
export function isValidVietnamesePhone(phone) {
  return /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/.test(phone);
}

/**
 * Converts phone numbers to E.164 format for Firebase.
 * Example: 0901234567 -> +84901234567
 * If already in +84 format, returns as is.
 */
export function convertToE164(phone) {
  // Remove any non-digit characters
  let digits = phone.replace(/\D/g, "");

  // If it starts with 0, replace with +84
  if (digits.startsWith("0")) {
    digits = "+84" + digits.substring(1);
  }

  // If already starts with 84 and missing '+', add it
  else if (digits.startsWith("84")) {
    digits = "+" + digits;
  }

  // Otherwise assume it’s already in correct format
  else if (!digits.startsWith("+")) {
    digits = "+" + digits;
  }

  return digits;
}

/**
 * Resets form state for React components.
 * You should pass in React state setters instead of DOM element IDs.
 * 
 * @param {Function} setFormData - React state setter for form data
 * @param {Function} setOtpVisible - React state setter for showing OTP section
 * @param {Object} recaptchaVerifierRef - ref object holding recaptchaVerifier
 */
export function clearForm(setFormData, setOtpVisible, recaptchaVerifierRef) {
  setFormData({
    name: "",
    phone: "",
    otp: "",
  });
  setOtpVisible(false);

  if (recaptchaVerifierRef?.current) {
    recaptchaVerifierRef.current.clear();
    recaptchaVerifierRef.current = null;
  }
}
