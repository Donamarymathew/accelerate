const express=require('express');
const bodyParser=require('body-parser');
const empRouter=require('./routes/routing');
const errorLogger=require('./utilities/ErrorLogger');
const requestLogger=require('./utilities/RequestLogger');
const cors=require("cors");
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/employee', empRouter);
app.use(errorLogger);


console.log("Server listening in port 4000");
app.listen(4000);
module.exports=app;