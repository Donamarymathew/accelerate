const express = require('express');
var router = express.Router();
const EventDTO = require('../model/eventDTO');
const eventService = require('../service/eventService');
const create = require('../model/dbsetup');

router.get('/setupDb', (req, res, next) => {
    create.eventSetupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
});



router.get('/', (req, res, next) => {
    eventService.getAllEvents().then((response) => {
        res.json(response);
    }).catch((err) => next(err));
})


//get event details based on eventId
router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    eventService.getEventById(req.params.id).then((response) => {
        res.json(response);
    }).catch((err) => next(err))
})


//add Event
router.post('/', (req, res, next) => {
    const newEvent = new EventDTO(req.body);
    eventService.addEvent(newEvent).then((response) => {
        res.json(response.message);
    }).catch((err) => next(err))
})


router.delete('/:id', (req, res, next) => {
    eventService.deleteEvent(req.params.id).then((response) => {
        res.json(response.message);
    }).catch((err) => next(err))
})

//update Event
router.put('/', (req, res, next) => {
    eventService.updateEvent(req, res).then((response) => {
        res.json(response.message);
    }).catch((err) => next(err))
})

module.exports = router;