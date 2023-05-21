const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    // Get the JWT token from the request header
    const authHeader = req.headers.authorization
    const token = authHeader
    // && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message: 'Authentication failed: Token is missing.'
        });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach the decoded user object to the request object
        req.user = decoded.user;

        // Call the next middleware function
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed: Invalid token.'
        });
    }
}

module.exports = authentication