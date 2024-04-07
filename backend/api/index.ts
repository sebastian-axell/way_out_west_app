let express = require('express');
let crypto = require('crypto');
let app = express();
let port = 4040 //process.env.PORT || 3000;

let secretKey="3"
let apiKey = "test"
const access_key = process.env.SECRET_KEY;

// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
    if (!req.headers['api-hash']) {
        return res.status(401).json({ error: 'API key is missing' });
    }

    try {
        let encryptedAPIKey = req.headers['api-hash'];
        let calculatedHash = crypto.createHmac('sha256', secretKey)
                                    .update(apiKey)
                                    .digest('hex');
        if (calculatedHash === encryptedAPIKey) {
            console.log('Message integrity verified. Sender is trusted.');
            console.log("test");
            
            console.log(access_key);
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
    res.json({ message: `Hello! You have access to this protected resource.`, key: access_key});
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});

module.exports = app;


//npm install express axios crypto