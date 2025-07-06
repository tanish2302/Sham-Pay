const jwt = require("jsonwebtoken");

//decode token

module.exports = function (req, res, next) {
    try {
        // Ensure req.body exists
        if (!req.body) {
            req.body = {};  // Initialize req.body if it's undefined
        }

        // Log the request body before processing
        console.log("Request Body Before Middleware:", req.body);
        
        //check if token exists
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                message: "Access Denied. No token provided.",
                success: false,
            });
        }

        //decode the token
        const decoded = jwt.verify(token, process.env.jwt_secret);

        //log the decoded token
        console.log("Decoded Token:", decoded);

        // Check if decoded contains userId
        if (!decoded || !decoded.userId) {
            return res.status(401).send({ message: "Invalid token", success: false });
        }
        
        //attach userid to the request body
        req.userId = decoded.userId;
        // Log the updated request body after adding userId
        console.log("Request Body After Middleware:", req.body);
        next();
    } catch (error) {
        console.error("Error in Middleware", error);
        res.send({
            message: error.message,
            success: false,
        });
    }
};