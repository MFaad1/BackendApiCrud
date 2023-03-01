
const jwt = require("jsonwebtoken");
const secKey = "2342424234dfa";

const middle = (req, res, next) => {
    if (req.headers && req.headers.token) {
        try {
            const decoded = jwt.verify(req.headers.token, secKey);
            req.email = decoded.email;
            next();
        } catch (err) {
            return res.status(401).json({
                message: "Token is not valid",
            });
        }
    } else {
        return res.status(401).json({
            message: "Token is missing",
        });
    }
};

module.exports = {middle};