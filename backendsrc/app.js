const express = require('express');
const bodyParser = require('body-parser');
const empRouter = require('./routes/routing');
const eventRouter = require('./routes/eventsRouter');
const errorLogger = require('./utilities/ErrorLogger');
const requestLogger = require('./utilities/RequestLogger');
const cors = require("cors");
const app = express();
app.use(cors());

app.listen(4000, () => {
    console.log('listenig on 4000');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/employee', empRouter);
app.use('/events', eventRouter);

app.use(errorLogger);

module.exports = app;
