// npm install express axios crypto

const express = require('express');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 3000;

const secretKey="3"
const apiKey = "test"

// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
    if (!req.headers['api-hash']) {
        return res.status(401).json({ error: 'API key is missing' });
    }

    try {
        const encryptedAPIKey = req.headers['api-hash'];
        const calculatedHash = crypto.createHmac('sha256', secretKey)
                                    .update(apiKey)
                                    .digest('hex');
        if (calculatedHash === encryptedAPIKey) {
            console.log('Message integrity verified. Sender is trusted.');
            next();
        } else {
            console.log('Message integrity could not be verified. Potential tampering.');
            return res.status(404).json({ error: 'Not authorised' }); 
        }
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

module.exports = app;
