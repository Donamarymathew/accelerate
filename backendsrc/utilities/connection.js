const { Schema } = require("mongoose");
const Moongoose = require("mongoose");
Moongoose.Promise = global.Promise;
Moongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/EmployeeSignup";
const collection = {};

const employeeSchema = Schema({
    staffId: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, minLength: [7, "password should have atleast 7 characters"], maxLength: [15, "password should not exceed 15 characters"] },
}, { collection: "EmployeeSignup" });

collection.getEmployeeCollection = () => {
    return Moongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
        return database.model('EmployeeSignup', employeeSchema)
    }).catch(() => {
        let err = new Error("Could not connect to employee Collection Database");
        err.status = 500;
        throw err;

    })
}

var eventSchema = Schema({

    eventId: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        lattitude: {
            type: String
        },
        longitude: {
            type: String
        }
    },
    eventDateTime: {
        type: Date
    },
    empId: {
        type: String
    },
    rewardPoints: {
        type: String
    }
}, { collection: "EventCollection" });


collection.getEventCollection = () => {
    return Moongoose.connect('mongodb://localhost:27017/EventDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then((database) => {
        return database.model('EventCollection', eventSchema);
    }).catch(() => {
        let err = new Error("Could not connect to employee Collection Database");
        err.status = 500;
        throw err;
    })
}

module.exports = collection;