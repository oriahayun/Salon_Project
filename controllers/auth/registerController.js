const { User } = require('../../models/User')

const registerView = (req, res) => {
    res.render("register", { status: "" });
};

const register = async (req, res) => {
    const { firstname, lastname, email, location, latitude, longitude, gender, role, password } = req.body;
    const userExist = await User.findOne({ email: email });
    
    if (userExist) {
        res.render("register", { status: "error", message: "This email is already in use, please choose another one" });
    } else {
        let newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            location: location,
            latitude: latitude,
            longitude: longitude,
            gender: gender,
            role: role
        });
        await newUser.save();

        res.render("login", { status: "success", message: "Register Success!" })
    }

}

module.exports = {
    registerView,
    register
};