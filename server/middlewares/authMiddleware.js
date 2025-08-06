const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        // Get token from the header
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                message: "Authorization failed. No token provided.",
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.jwt_secret);
        if (!decoded || !decoded.userId) {
            return res.status(401).send({ message: "Invalid token", success: false });
        }
        
        // Attach userId directly to the request object
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({
            message: "Authorization failed. Invalid token.",
            success: false,
        });
    }
};