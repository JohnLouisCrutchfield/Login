const jwt = require('jsonwebtoken');
require('dotenv').config();  // Load environment variables first
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET ? "SET" : "NOT SET");  // Debugging log

function generateToken(data) {
    return jwt.sign({ data }, process.env.JWT_SECRET || 'default-secret-key', { expiresIn: '1h' });
}

function requireAuthentication(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const accessToken = token.split(' ')[1] || token;
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded.data;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = { generateToken, requireAuthentication };
