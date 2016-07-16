'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const ContactInfo = require('./contact-info');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let mongoDb = process.env.DB || 'localhost/test';
mongoose.connect(`mongodb://${mongoDb}`);

require('./cors')(app);

app.post('/', function (req, res) {
  let body = req.body;
  if (!body) res.status(400);

  new ContactInfo(body).save()
    .then(data => {
      console.log("Data saved: " + data);
      res.sendFile('index.html', { root: __dirname + "/public" });
    })
    .catch(err => {
      console.error(err);
      res.status(500);
    });
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
