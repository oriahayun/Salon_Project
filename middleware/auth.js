const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.redirect("/login")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded) {
            req.user = decoded
            return next()
        } else {
            return res.send("Not allowed")
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

};

module.exports = { auth };