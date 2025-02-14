import CryptoJS from "crypto-js";

export function encryptNote(text, password) {
  return CryptoJS.AES.encrypt(text, password).toString();
}

export function decryptNote(encryptedText, password) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, password);
  return bytes.toString(CryptoJS.enc.Utf8);
}
const word = `Hello hi how are you 


why are you doing this<asdfas></asdfasdf>*****

no why`;
const password = "a";

const encreptedword = encryptNote(word, password);
console.log("encreptedword: ", encreptedword);

const decriptedWord = decryptNote(encreptedword, password);
console.log("decriptedWord: ", decriptedWord);
