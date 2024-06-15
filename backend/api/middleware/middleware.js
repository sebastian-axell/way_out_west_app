
const middlewareHelpers = require("../helpers/helpers")
const middlewareConstants = require("../constants");
const jwt = require('jsonwebtoken');

var corsOptions = {
  origin: process.env.NODE_ENV == 'local' ? process.env.localUrl : process.env.remoteUrl,
  credentials: true
};

function setCorsHeaders(req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.NODE_ENV == 'local' ? process.env.localUrl : process.env.remoteUrl)
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}

function verifyApiKey(req, res, next) {
  let auth_header = req.headers['authorization'];
  if (!auth_header || !auth_header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'API key is missing' });
  }
  // get the api key
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

// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
  // verify the token
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }
  jwt.verify(token, process.env.jwtpassword, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else {
        return res.status(403).json({ message: 'Forbidden' });
      }
    } else {
      next();
    }
  });
}

module.exports = {
  verifyToken,
  verifyApiKey,
  setCorsHeaders,
  corsOptions
}