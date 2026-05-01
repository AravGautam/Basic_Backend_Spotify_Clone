const jwt = require('jsonwebtoken');


async function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized User, no token provided'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid Token, unauthorized access terminated'
            });
        }
        if (decoded.role !== 'artist' && decoded.role !== 'user') {
            return res.status(403).json({
                message: 'Forbidden: Only artists and listeners can access this resource'
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Token, unauthorized access terminated'
        });
    }
}

async function authorizeUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized User, no token provided'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid Token, unauthorized access terminated'
            });
        }
        if (decoded.role !== 'user') {
            return res.status(403).json({
                message: 'Forbidden: Only users can access this resource'
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Token, unauthorized access terminated'
        });
    }
}

async function authorizeArtist(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized User, no token provided'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid Token, unauthorized access terminated'
            });
        }
        if (decoded.role !== 'artist') {
            return res.status(403).json({
                message: 'Forbidden: Only artists can access this resource'
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Token, unauthorized access terminated'
        });
    }
}

module.exports = {
    authenticateToken,
    authorizeUser,
    authorizeArtist
}
