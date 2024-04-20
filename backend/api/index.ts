let express = require('express');
let crypto = require('crypto');
const cors = require('cors'); // Import the cors packag
let app = express();
let port = 4040;

app.use(cors());

const access_key = process.env.SECRET_KEY;
let apiKey = process.env.apiKey; 
const keyHex = process.env.keyHex; 
const ivHex = process.env.ivHex;


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
    let auth_header = req.headers['authorization'];
    if (!auth_header || !auth_header.startsWith('Bearer ') ) {
        return res.status(401).json({ error: 'API key is missing' });
    }
    try {
        let encryptedAPIKey = auth_header.split(' ')[1];
        let decryptedText = decrypt(encryptedAPIKey, keyHex, ivHex);

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