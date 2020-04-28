const express = require('express');
const router = express.Router();
const empService = require('../service/empService');
const empModel = require('../model/employee');
const create = require('../model/dbsetup');
var bodyParser = require('body-parser');
//router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());


router.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})



// get all employee detail
router.get('', (req, res, next) => {
    empService.getAllEmployees().then((response) => {
        res.json(response);
    }).catch((err) => next(err));
})


//get employee details based on empId
router.get('/id/:id', (req, res, next) => {
    let employeeId = req.params.id;

    empService.getEmployeeById(employeeId).then((response) => {
        res.json(response);
    }).catch((err) => next(err))
})


//to login
router.post('/verify', (req, res, next) => {
    const employeeId = req.body.staffId;
    const password = req.body.password;
    empService.loginEmployee(parseInt(employeeId), password).then((response) => {
        res.json(response.message)
    }).catch((err) => {
        next(err)
    })
})


//register employee
router.post('', (req, res, next) => {
    const newEmp = new empModel(req.body);

    empService.registerEmployee(newEmp).then((response) => {
        res.json(response.message);
    }).catch((err) => next(err))
})

//get delete an employee  based on empId
router.delete('/:id', (req, res, next) => {
    let employeeId = req.params.id;

    empService.deleteEmployee(employeeId).then((response) => {
        res.json(response.message);
    }).catch((err) => next(err))
})

//update password
router.put('', (req, res, next) => {
    let staffId = req.body.staffId;
    let password = req.body.password;
    empService.updateEmployee(staffId, password).then((response) => {
        res.json(response.message);
    }).catch((err) => next(err))
})

module.exports = router;
