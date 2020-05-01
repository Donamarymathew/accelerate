const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const create = require('../utilities/dbsetup');

router.get('/setupDb',(req,res,next)=>{
    create.setupDb().then ((data)=>{
   res.send(data) 
    }).catch((err)=>{
        next(err)
    })
});

router.get('/', (req, res) => {
    listOfRecords(req, res);
});

router.post('/:id', function (req, res) {
    findById(req, res, req.params.id);
    //    res.render('students', { name: students[req.params.id], id: req.params.id });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

router.put('/', (req, res) => {
    updateRecord(req, res);
});

router.delete('/:id', (req, res) => {
    deleteRecord(req, res, req.params.id);
});

function insertRecord(req, res) {
    console.log('inside insert');
    var event = new Event();
    event.eventId = req.body.eventId;
    event.title = req.body.title;
    event.description = req.body.description;
    event.location = req.body.location;
    event.eventDate = req.body.eventDate;
    event.empId = req.body.empId;
    event.rewardPoints = req.body.rewardPoints;
    event.save((err, doc) => {
        if (!err) {
            console.log(doc);
            res.send(doc);
        } else {
            console.log('Error during record insertio ' + err);
        }
    });
}

function listOfRecords(req, res) {
    Event.find((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('error in retriving data');
        }
    });
};

function updateRecord(req, res) {
    Event.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.send('data updated');
        } else {
            res.send({ "error": "data cant be update" });
        }
    });
};

function deleteRecord(req, res, id) {
    Event.findByIdAndDelete(id, (err, doc) => {
        if (doc === null)
            res.send("data cant be delete");
        else if (!err) {
            res.send('data deleted');
        }
    });
};

function findById(req, res, id) {
    console.log(id);
    Event.findById(id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            res.send({ "error": "data cant be retrived" });
        }
    });
}

module.exports = router;