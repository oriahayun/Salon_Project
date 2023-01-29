const mongoose = require("mongoose");
const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

// Mongo DB conncetion
const database = process.env.MONGO_URI;
mongoose.set('strictQuery', false);
mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MONGO CONNECTION OPEN!!'))
    .catch(err => console.log(err));
    
//Seed User For admin
const seedDB = async () => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_NUM));
    const password = await bcrypt.hash("admin!@#", salt)
    const seedUsers = [
        {
            firstname: "admin",
            lastname: "admin",
            email: "admin@admin.com",
            role: "admin",
            password: password
        }
    ];
    await User.deleteMany({});
    await User.insertMany(seedUsers);
}

seedDB().then(() => {
    mongoose.connection.close();
})