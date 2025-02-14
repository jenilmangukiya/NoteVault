import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encryptNote(text, password) {
  return CryptoJS.AES.encrypt(text, password).toString();
}

export function decryptNote(encryptedText, password) {
  try {
    console.log("encryptedText", encryptedText);
    console.log("password", password);
    const bytes = CryptoJS.AES.decrypt(encryptedText || "", password || "");
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.log("error: ", error);
    return "";
  }
}
