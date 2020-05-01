const dbModel = require('../utilities/connection');
const eventModel = {};
var ObjectID = require('mongodb').ObjectID;

//get all event details
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

eventModel.findEventId = (eventId) => {
    return dbModel.getEventCollection().then((model) => {
        return model.findOne({ "eventId": eventId }).then((event) => {
            if (event) { return event }
            else { return null };
        });
    });
};

//delete an event based on id
eventModel.deleteEvent = (eventId) => {
    return dbModel.getEventCollection().then((model) => {
        return model.deleteOne({ "eventId": eventId }).then(deleted => {

            if (deleted.n > 0) return deleted.n;
            else return null;
        })
    })
}



// add new event details
eventModel.addEvent = (eventObj) => {
    return dbModel.getEventCollection().then(model => {
        return model.create(eventObj).then((insertedData) => {
            if (insertedData) {
                return insertedData.eventId;
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
                if (data) {
                    return data;
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