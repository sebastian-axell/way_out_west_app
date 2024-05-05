const CryptoJS = require('crypto-js');
const Papa = require('papaparse');

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


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

function processCsvData(csv_data) {
    const decodedString = atob(csv_data['content']);
    const lines = decodedString.split("\n");
    const dataArray = lines.map(line => {
        const decodedLine = decodeURIComponent(escape(line.trim()));
        return decodedLine;
    }).join('\n');
    const parsedData = Papa.parse(dataArray.trim(), { header: true }).data;
    return parsedData;
}

export default {encrypt, decrypt, toBase64, processCsvData};