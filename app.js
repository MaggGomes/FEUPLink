var express = require('express');
var app = express();
const Sequelize = require('sequelize');

require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME_DEV, process.env.DB_USER_DEV, process.env.DB_PASS_DEV, {
  host: process.env.DB_HOST_DEV,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

console.log(process.env.DB_NAME_DEV);
console.log(process.env.DB_USER_DEV);
console.log(process.env.DB_PASS_DEV);
console.log(process.env.DB_HOST_DEV);
