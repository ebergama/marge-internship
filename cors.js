'use strict';

let cors = require('cors');
let options = {
  origin: "http://www.medallia.com.ar"
};

module.exports = (app) => {
  app.use(cors(options));
}
