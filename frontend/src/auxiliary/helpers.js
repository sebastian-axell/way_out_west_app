const CryptoJS = require('crypto-js');

function encrypt(text, keyHex, ivHex) {
    const key = CryptoJS.enc.Hex.parse(keyHex);
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

function decrypt(encryptedText, keyHex, ivHex) {
  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encryptedTextBytes = CryptoJS.enc.Hex.parse(encryptedText);
  
  const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedTextBytes },
      key,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );
  
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default {encrypt, decrypt};