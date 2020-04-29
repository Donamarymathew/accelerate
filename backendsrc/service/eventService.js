const eventdb = require('../model/eventModel');
let eventService = {}
const validator = require('../utilities/validator');

//get details of all employees
eventService.getAllEvents = () => {
    return eventdb.getAllEvents().then(data => {
        if (data == null) {
            let err = new Error("There are no Event yet!");
            err.status = 404;
            throw err;
        }
        else {
            return data;
        }
    })
};

//get detail of an event based on eventId

eventService.getEventById = (_id) => {
    console.log(_id);
    return eventdb.findEvent(_id).then((event) => {
        if (event == null) {
            let err = new Error("Employee details not available!! Please Register");
            err.status = 404;
            throw err;
        } else {
            return event;
        }
    })
};


//add event
eventService.addEvent = (eventObj) => {
    return eventdb.addEvent(eventObj).then((data) => {
        if (data) {
            return { "message": "Successfully add Event: " };
        }
        else {
            let err = new Error("Event Details not Inserted");
            err.status = 500;
            throw err;
        }
    })
}
//delete event
eventService.deleteEvent = (_id) => {
    return eventdb.findEvent(_id).then(object => {
        if (object == null) {
            let err = new Error("Employee not registered!!");
            err.status = 404;
            throw err;
        } else {
            return eventdb.deleteEvent(_id).then(data => {
                if (data) {
                    return { "message": `Deleted Event with ID: ${_id}` };
                }
                else {
                    let err = new Error("Failed to delete the Event");
                    err.status = 403;
                    throw err;
                }
            })
        }
    })
}


//update Event
eventService.updateEvent = (req, res) => {

    return eventdb.updateEvent(req).then(data => {
        if (data) {
            return { "message": "Successfully updateded Event" }
        }
        else {
            let err = new Error("Sorry!! Failed to update event");
            err.status = 403;
            throw err;
        };
    });
};

module.exports = eventService;