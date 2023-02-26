const { Position } = require("../models/Position");

const salonListView = async (req, res) => {
    const positions = await Position.find();
    res.render('salonList', { positions: positions });
}

const salonNewView = async (req, res) => {
    res.render('salonNew', { status : "" });
}

module.exports = {
    salonListView,
    salonNewView
}