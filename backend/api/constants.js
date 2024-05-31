require('dotenv').config();

let access_key;
let keyHex;  
let ivHex;

if (process.env.NODE_ENV == "local"){
  access_key = process.env.apiKey;
  keyHex = process.env.keyHex; 
  ivHex = process.env.ivHex;  
  secret_key = process.env.SECRET_KEY;
} else {
  access_key = process.env.apiKey;
  keyHex = process.env.keyHex; 
  ivHex = process.env.ivHex;
  secret_key = process.env.SECRET_KEY;
}

module.exports = {
    access_key,
    ivHex,
    keyHex,
    secret_key
}