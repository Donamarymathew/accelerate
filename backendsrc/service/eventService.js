const eventdb = require('../model/eventModel');
let eventService = {}
const validator = require('../utilities/validator');

//get details of all events
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

eventService.getEventById = (eventId) => {
    return eventdb.findEventId(eventId).then((event) => {
        if (event == null) {
            let err = new Error("Event details not available!! Please Register");
            err.status = 404;
            throw err;
        } else {
            return event;
        }
    })
};


//add event
eventService.addEvent = (newEvent) => {
    return eventdb.findEventId(newEvent.eventId).then(object => {
        if (object != null) {
            let err = new Error("Event already Exist");
            err.status = 404;
            throw err;
        } else {
            return eventdb.addEvent(newEvent).then((data) => {
                if (data) {
                    return { "message": "Successfully added Event with ID : " + data };
                }
                else {
                    let err = new Error("Event Details not Inserted");
                    err.status = 500;
                    throw err;
                }
            })
        }
    });
};

//delete event
eventService.deleteEvent = (eventId) => {
    return eventdb.findEventId(eventId).then(object => {
        if (object == null) {
            let err = new Error("Event not Registered!!");
            err.status = 404;
            throw err;
        } else {
            return eventdb.deleteEvent(eventId).then(data => {
                if (data) {
                    return { "message": "Event Deleted Successfully" };
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
    return eventdb.findEventId(req.body.eventId).then(object => {
        if (object == null) {
            let err = new Error("Event not Registered!!");
            err.status = 404;
            throw err;
        } else {
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
    });
};
eventService.getEventByDate = (date) => {
    return eventdb.findByDate(date).then(data => {
        if (data) {
            return data;
        }
        else {
            let err = new Error("Sorry!! There is no Event above this date");
            err.status = 403;
            throw err;
        };
    });
};

module.exports = eventService;