'use strict';

let express = require('express');
let app = express();
const cors = require('./cors')(app);

let mongoose = require('mongoose');
mongoose.Promise = Promise;
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let mongoDb = process.env.DB || 'localhost/test';
mongoose.connect(`mongodb://${mongoDb}`);

let routes = require('./routes');
app.use("/", routes);

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
