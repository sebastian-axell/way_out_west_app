let express = require('express');
let crypto = require('crypto');
let app = express();
let port = 4040;

// let secretKey="m5yVsB3OH6SuUR5OrTFCMQK8sbzsRUbrzaQueYcr9oc="

const access_key = process.env.SECRET_KEY;

let apiKey = "E78j6jYcHFMz6miZXvmdoVdbW5ywhB9JunEfD980pK0="
const keyHex = '01eda8f0bcae94a569139c6126dd5d2929863500de660b3f6414d0b4c9cc3770'; // 256-bit 
const ivHex = 'b22ec2381daab4d862d5c76ab07c00d8'; // 128-bit 


// Encrypt function using AES
function encrypt(text, keyHex, ivHex) {
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

// Decrypt function using AES
function decrypt(encryptedText, keyHex, ivHex) {
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    
    let encryptedTextBuffer = Buffer.from(encryptedText, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    if (!req.headers['api-key']) {
        return res.status(401).json({ error: 'API key is missing' });
    }

    try {
        let encryptedAPIKey = req.headers['api-key'];
        let decryptedText = decrypt(encryptedAPIKey, keyHex, ivHex);

        // let calculatedHash = crypto.createHmac('sha256', secretKey)
        //                             .update(apiKey)
        //                             .digest('hex');
        if (decryptedText === apiKey) {
            console.log('API key verified. Sender is trusted.');
            next();
        } else {
            console.log('API key could not be verified.');
            return res.status(401).json({ error: 'Not authorised' }); 
        }
    } catch (error) {
        console.error('Error decrypting API key:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Protected route
app.get('/protected', verifyToken, (req, res) => {
    // Access user info from decoded token
    res.json({ message: `Hello! You have access to this protected resource.`, key: encrypt(access_key, keyHex, ivHex)});
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});

module.exports = app;


//npm install express axios crypto