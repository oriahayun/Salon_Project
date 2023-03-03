const { Appointment } = require("../models/Appointment");
const { Position } = require("../models/Position");
const { User } = require("../models/User");
const axios = require("axios");

const dashboardView = async (req, res) => {
    const positions = await Position.find();
    res.render('dashboard', { positions: positions, pageName: "dashboard" });
}

const ownerDashboardView = async (req, res) => {
    const positions = await Position.find();
    res.render('ownerDashboard', { positions: positions, pageName: "owner-dashboard" });
}

const adminDashboardView = async (req, res) => {
    var apiIP = 'https://ipinfo.io';
    const currentIPInformation = (await axios.get(apiIP)).data
    let location = currentIPInformation.city + ", " + currentIPInformation.country;
    const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";
    const weatherData = (await axios.get(weatherAPI, { params: { q: location, units: 'metric', appid: "bc1301b0b23fe6ef52032a7e5bb70820" } })).data

    const appointmentData = await Appointment.aggregate([
        {
            $sort: { createdAt: 1 },
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                count: { $sum: 1 },
            },
        },
    ]);
    const clientData = await User.aggregate([
        {
            $sort: { createdAt: 1 },
        },
        {
            $match: { role: "client" },
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 },
            },
        },
    ]);
    const aData = appointmentData;
    const cData = clientData;
    res.render('adminDashboard', { appointment: aData, clients: cData, pageName: "admin-dashboard", weatherData: weatherData, currentLocation: location });
}

module.exports = {
    dashboardView,
    ownerDashboardView,
    adminDashboardView
}