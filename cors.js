'use strict';

let cors = require('cors');
let options = {
  origin: "http://www.medallia.com.ar",
  methods: 'POST',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept'
};

module.exports = (app) => {
  app.use(cors(options));
}
