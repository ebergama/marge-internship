'use strict';

let mongoose = require('mongoose');

let ContactInfoNext = mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  englishLevel: String,
  university: String,
  career: String,
  careerTimeLeft: String
});

module.exports = mongoose.model("ContactInfoNext", ContactInfoNext);
