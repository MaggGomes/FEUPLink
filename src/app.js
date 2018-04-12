// loading environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);


// sequelize.sync({force: true}) // this will drop and delete all the database (please be careful!!)
sequelize.sync()
  .then(() => {
    app.listen(process.env.SERVER_PORT, function() {
      console.log(`FEUPLink started on port ${process.env.SERVER_PORT}`);
    });
  });

