const { Appointment } = require("../models/Appointment");
const { Position } = require("../models/Position");

const salonListView = async (req, res) => {
    const positions = await Position.find();
    res.render('salonList', { positions: positions, pageName: "salons" });
}

const salonNewView = async (req, res) => {
    res.render('salonNew', { status: "", message: "" });
}

const salonEditView = async (req, res) => {
    const { id } = req.params;
    const positionExist = await Position.findById(id);
    if (positionExist) {
        res.render('salonEdit', { status: "", position: positionExist });
    } else {
        res.render('salonEdit', { status: "error", position: {}, message: "not Existed", pageName: "salons" });
    }
    
}

const salonNewCreate = async (req, res) => {
    const { name, location, latitude, longitude, description } = req.body;
    try {
        const { salon_file } = req.files;
        let screenName = Date.now() + salon_file.name;
        salon_file.mv('./public/media/' + screenName);
        const positionExist = await Position.findOne({ name: name });
        if (positionExist) {
            res.render("salonNew", {
                status: "error", message: "The Salon already existed!", pageName: "salons"
            });
        } else {
            let newPosition = new Position({
                screen: screenName, 
                name: name,
                location: location,
                latitude: latitude,
                longitude: longitude,
                description: description,
            });

            await newPosition.save();

            res.render("salonNew", {
                status: "success", message: "Success!", pageName: "salons"
            });
        }
    } catch (error) {
        res.render("salonNew", {
            status: "error", message: "You have to upload image.", pageName: "salons"
        });
    }
    
    
}

const salonUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, location, latitude, longitude } = req.body;
    const positionExist = await Position.findById(id);
    if (positionExist) {
        positionExist.name = name;
        positionExist.location = location;
        positionExist.latitude = latitude;
        positionExist.longitude = longitude;
        try {
            const { salon_file } = req.files;
            if (salon_file) {
                let screenName = Date.now() + salon_file.name;
                salon_file.mv('./public/media/' + screenName);
                positionExist.screen = screenName;
            }
        } catch (error) {
            console.log(error)
        }
        
        await positionExist.save();

        res.render("salonEdit", {
            status: "success", message: "Success Updated!", position: positionExist, pageName: "salons"
        });
    } else {
        
        res.render("salonEdit", {
            status: "error", message: "The Salon not existed!", position: {}, pageName: "salons"
        });
    }

}

const salonNewDelete = async (req, res) => {
    const { id } = req.body;
    const position = await Position.findById(id);
    if (position) {
        await Position.deleteOne({ _id: id });
        res.json({
            status: 'success'
        })
    } else {
        res.json({
            status: 'error'
        })
    }

}

const salonDetailView = async (req, res) => {
    const { id } = req.params;
    const position = await Position.findById(id);
    if (!position) {
        res.render('salonDetail', { status: "error", message: "The Salon is not existed." });
    } 
    res.render('salonDetail', { status: "", message: "", position: position , pageName: "salons"});
}

const salonAppointment = async (req, res) => {
    const { startDate, endDate, positionId } = req.body;

    const position = await Position.findById(positionId);
    if (!position) {
        res.render('salonDetail', { status: "error", message: "The Salon is not existed." });
    } 
    try {
        let newAppointment = new Appointment({
            startDate: startDate, 
            endDate: endDate,
            positionId: positionId,
            userId: req.user.id,
            status: "pending",
        });
    
        await newAppointment.save();
    
        res.json({ status: "success", message: "Success!" });
    } catch (error) {
        res.json({ status: "error", message: "Error!" });
    }
    
}

module.exports = {
    salonListView,
    salonNewView,
    salonNewCreate,
    salonNewDelete,
    salonEditView,
    salonUpdate,
    salonDetailView,
    salonAppointment
}