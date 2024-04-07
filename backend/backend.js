// npm install express axios crypto

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Replace this secret with your actual secret key used to sign JWT tokens
const access_key = 'your-jwt-secret';
SECRET_KEY = "hey"

// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
    if (!req.headers['api-key']) {
        return res.status(401).json({ error: 'API key is missing' });
    }

    try {
        const encryptedApiKey = req.headers['api-key'];
        const decipher = crypto.createDecipher('aes-256-cbc', SECRET_KEY);
        let decryptedApiKey = decipher.update(encryptedApiKey, 'hex', 'utf8');
        decryptedApiKey += decipher.final('utf8');
        req.decryptedApiKey = decryptedApiKey;
        next();
    } catch (error) {
        console.error('Error decrypting API key:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Protected route
app.get('/protected', verifyToken, (req, res) => {
    // Access user info from decoded token
    res.json({ message: `Hello! You have access to this protected resource.` });
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
