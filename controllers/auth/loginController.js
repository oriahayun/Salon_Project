const { generateToken } = require("../../utils/generateToken");
const { User } = require('../../models/User')

const loginView = (req, res) => {
    res.render('login', {
        status: ''
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist && (await userExist.matchPassword(password))) {
        res.json({
            status: 'success',
            userToken: generateToken(userExist._id),
            user: {
                _id: userExist._id,
                firstname: userExist.firstname,
                lastname: userExist.lastname,
                email: userExist.email,
                location: userExist.location,
                latitude: userExist.latitude,
                longitude: userExist.longitude,
                gender: userExist.gender,
                role: userExist.role,
            }
        })

    } else {
        res.json({ status: "error", message: "The email or password is not correct" })
    }
}

module.exports = {
    loginView,
    loginUser
}