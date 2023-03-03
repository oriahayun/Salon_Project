const { User } = require("../models/User");

const userListView = async (req, res) => {
    const userList = await User.find();
    res.render('userList', { users: userList, pageName: "users" });
}

const userNewView = async (req, res) => {
    res.render('userNew', { status: "", message: "", pageName: "users" });
}

const userEditView = async (req, res) => {
    const { id } = req.params;
    const userExist = await User.findById(id);
    if (userExist) {
        res.render('userEdit', { status: "", user: userExist, pageName: "users" });
    } else {
        res.render('userEdit', { status: "error", user: {}, message: "not Existed", pageName: "users" });
    }

}

const userNewCreate = async (req, res) => {
    const { firstname, lastname, email, location, latitude, longitude, gender, role, password } = req.body;
    const userExist = await User.findOne({ email: email });
    
    if (userExist) {
        res.render("userNew", { status: "error", message: "This email is already in use, please choose another one", pageName: "users" });
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

        res.render("userNew", { status: "success", message: "New User Added Successfully!", pageName: "users" })
    }

}

const userUpdate = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, location, latitude, longitude, gender, role } = req.body;
    const userExist = await User.findById(id);
    
    if (userExist) {
        userExist.firstname= firstname,
        userExist.lastname= lastname,
        userExist.email= email,
        userExist.location= location,
        userExist.latitude= latitude,
        userExist.longitude= longitude,
        userExist.gender= gender,
        userExist.role= role
        await userExist.save();

        res.render("userEdit", { status: "success", message: "User Updated Successfully!", user: userExist, pageName: "users" })
    } else {
        
        res.render("userEdit", { status: "error", message: "The user is not Existed", user: {}, pageName: "users" });
    }

}

module.exports = {
    userListView,
    userNewView,
    userNewCreate,
    userUpdate,
    userEditView
}