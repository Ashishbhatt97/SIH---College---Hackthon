const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;


const tokenGenerator = (payload) => {
    let result = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: "30d",
    });

    result = "Bearer " + result;
    return result;
};

const jwtAuth = async (
    req,
    res,
    next
) => {
    const authToken = req.header("Authorization")?.split(" ")[1];

    try {
        if (!authToken || authToken === undefined) {
            return res.json({
                status: 401,
                message: "Unauthorized",
            });
        }

        if (SECRET) {
            jwt.verify(authToken, `${process.env.JWT_SECRET}`, (err, payload) => {
                if (err) {
                    return res.json({
                        status: 401,
                        message: "Unauthorized",
                    });
                } else {
                    req.user = payload;
                    next(); // Proceed to the next middleware or route handler
                }
            });
        }
    } catch (err) {
        return res.json({
            status: 401,
            message: "Invalid token",
        });
    }
};

module.exports = { jwtAuth, tokenGenerator };
