const { Appointment } = require("../models/Appointment");
var moment = require('moment');

const appointmentListView = async (req, res) => {
    const appointments = await Appointment.find().populate("positionId", ['name']).populate("userId", ["firstname", "lastname"]);
    res.render('appointmentList', { appointments: appointments, moment: moment });
}

const appointmentHistoryListView = async (req, res) => {
    const appointments = await Appointment.find({ userId: req.user.id }).populate("positionId", ['name']).populate("userId", ["firstname", "lastname"]);
    res.render('appointHistory', { appointments: appointments, moment: moment });
}

const appointmentApprove = async (req, res) => {
    const { id, status } = req.body;
    const appointment = await Appointment.findById(id);
    if (appointment) {
        appointment.status = status
        await appointment.save();
        res.json({
            status: 'success'
        })
    } else {
        res.json({
            status: 'error'
        })
    }

}

const appointmentDelete = async (req, res) => {
    const { id } = req.body;
    const appointment = await Appointment.findById(id);
    if (appointment) {
        await Appointment.deleteOne({ _id: id });
        res.json({
            status: 'success'
        })
    } else {
        res.json({
            status: 'error'
        })
    }

}

module.exports = {
    appointmentListView,
    appointmentApprove,
    appointmentDelete,
    appointmentHistoryListView
}