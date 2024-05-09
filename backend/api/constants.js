

let access_key;
let keyHex;  
let ivHex;

if (process.env.NODE_ENV == "local"){
  access_key = process.env.SECRET_API_KEY;
  keyHex = process.env.ENCRYPT_KEY_HEX; 
  ivHex = process.env.ENCRYPT_IV_HEX;  
} else {
  access_key = process.env.apiKey;
  keyHex = process.env.keyHex; 
  ivHex = process.env.ivHex;
}

console.log(access_key, keyHex, ivHex);

module.exports = {
    access_key,
    ivHex,
    keyHex
}