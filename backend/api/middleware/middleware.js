
const middlewareHelpers = require("../helpers/helpers")
const middlewareConstants = require("../constants");


// Allow requests from your frontend domains
const whitelist = ['https://we-out-west.vercel.app', 'https://weoutwest.info', 'http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
    let auth_header = req.headers['authorization'];
    if (!auth_header || !auth_header.startsWith('Bearer ') ) {
        return res.status(401).json({ error: 'API key is missing' });
    }
    try {
        let encryptedAPIKey = auth_header.split(' ')[1];
        let decryptedText = middlewareHelpers.decrypt(encryptedAPIKey, middlewareConstants.keyHex, middlewareConstants.ivHex);
        if (decryptedText === middlewareConstants.access_key) {
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

module.exports = {
    verifyToken,
    corsOptions
}