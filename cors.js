'use strict';

let cors = require('cors');
let options = {
  origin: "*",
  methods: 'POST',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept'
};

module.exports = (app) => {
  app.use(cors(options));
}
