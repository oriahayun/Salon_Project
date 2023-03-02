const jwt = require("jsonwebtoken");
const { User } = require("../models/User.js");

const auth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.redirect("/login")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded) {
            req.user = await User.findById(decoded.id).select('-password')
            return next()
        } else {
            return res.send("Not allowed")
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

};

module.exports = { auth };