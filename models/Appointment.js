const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
    {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        location: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
        positionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Position"},
        status: { type: String, enum: ['approve', 'decline', 'pending'], required: true },
        createdAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now, required: false },
    }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = { Appointment };