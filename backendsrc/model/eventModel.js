const dbModel = require('../utilities/connection');
const eventModel = {};
var ObjectID = require('mongodb').ObjectID;

//get all employee details
eventModel.getAllEvents = () => {
    return dbModel.getEventCollection().then(model => {
        return model.find().then(data => {
            if (data) { return data; }
            else {
                return null;
            }
        })
    })
}

//check whether a given empId is registered
eventModel.findEvent = (id) => {
    return dbModel.getEventCollection().then((model) => {
        return model.findById(id).then((event) => {
            if (event) { return event }
            else { return null };
        });
    });
};

//delete an employee based on id
eventModel.deleteEvent = (id) => {
    return dbModel.getEventCollection().then((model) => {
        return model.deleteOne({ "_id": id }).then(deleted => {
            if (deleted.n > 0) return id;
            else return null;
        })
    })
}



// add new event details
eventModel.addEvent = (eventObj) => {
    return dbModel.getEventCollection().then(model => {
        return model.create(eventObj).then((insertedData) => {
            if (insertedData) {
                return insertedData._id;
            }
            else {
                return null;
            }
        })
    })
}

eventModel.updateEvent = (req) => {
    return dbModel.getEventCollection().then(model => {
        return model.findOneAndUpdate({ "_id": req.body._id }, req.body,
            { new: true }).then(data => {
                console.log(data);
                if (data) {
                    return data._id;
                }
                else {
                    return null;
                }
            })
    })
};

eventModel.findByDate = (date) => {
    return dbModel.getEventCollection().then(model => {
        return model.find({ eventDateTime: { $gte: date } }).then(data => {
            console.log(data);
            if (data) {
                return data;
            }
            else {
                return null;
            }
        })
    })
};

module.exports = eventModel;