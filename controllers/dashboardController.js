const { Position } = require("../models/Position");

const dashboardView = async (req, res) => {
    const positions = await Position.find();
    res.render('dashboard', { positions: positions });
}

const ownerDashboardView = async (req, res) => {
    const positions = await Position.find();
    res.render('ownerDashboard', { positions: positions });
}

module.exports = {
    dashboardView,
    ownerDashboardView
}