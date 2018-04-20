// loading environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// eslint-disable-next-line
const {sequelize, Person} = require('./models');
// const createServer = require('auto-sni');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

// sequelize.sync({force: true}) // this will drop and delete all the database (please be careful!!)
sequelize.sync()
.then(() => {
  app.listen(process.env.SERVER_PORT, function() {
    // insert default admin user
    Person.findOrCreate({
      where: {
        email: 'admin@mail.com',
      },
      defaults: {
        name: 'Admin',
        hashedPassword: 'Password1',
        role: 'Super Admin',
      },
    });
    console.log(`FEUPLink started on port ${process.env.SERVER_PORT}`);
  });
});

module.exports = app;

