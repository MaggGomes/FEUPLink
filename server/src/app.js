// loading environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const databaseScript = require('./utils/database/databaseScript');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

/*
createServer({
  email: 'goncalo.ribeiro@fe.up.pt', // Email contacted when certificate expires
  agreeTos: true, // Required for letsencrypt.
  debug: true, // Add console messages and uses staging LetsEncrypt server. (Disable in production)
  domains: ['localhost'], // List of accepted domain names. (You can use nested arrays to register bundles with LE).
  dir: './test/fixtures/keys', // Directory for storing certificates. Defaults to '~/letsencrypt/etc' if not present.
  ports: {
    http: 8081, // Optionally override the default http port.
    https: 8082, // // Optionally override the default https port.
  },
}, app);
*/

// sequelize.sync({force: true}) // this will drop and delete all the database (please be careful!!)
 sequelize.sync({force: true})
  .then(() => {
    app.listen(process.env.PORT, function() {
      // Fill the database with data
      databaseScript.populateDatabase();
      console.log(`FEUPLink server started on ${process.env.SERVER_URL_DEV}`);
    });
});

module.exports = app;

