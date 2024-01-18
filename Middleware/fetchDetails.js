const jwt = require('jsonwebtoken');
const jwtSecret = "BlissBite";

const fetch = (req, res, next) => {
    // Get the user from the JWT token and add id to req object
    const token = req.header('token');
    
    if (!token) {
        return res.status(401).json({ error: "Invalid Auth Token" });
    }

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token has expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid Auth Token" });
        } else {
            // Handle other types of errors
            console.error("JWT Verification Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

module.exports = fetch;
