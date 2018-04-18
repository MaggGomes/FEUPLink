const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const db = {};

let dbName;
let dbUser;
let dbPass;
let dbHost;

if (process.env.HEROKU_ENV === 'production') {
  dbName = process.env.DB_NAME_PROD;
  dbUser = process.env.DB_USER_PROD;
  dbPass = process.env.DB_PASS_PROD;
  dbHost = process.env.DB_HOST_PROD;
  console.log('resultou');
  console.log(process.env.HEROKU_ENV);
} else {
  dbName = process.env.DB_NAME_DEV;
  dbUser = process.env.DB_USER_DEV;
  dbPass = process.env.DB_PASS_DEV;
  dbHost = process.env.DB_HOST_DEV;
}

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPass, {
    host: dbHost,
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

// eslint-disable-next-line
// This will read all the files in the current directory and import them to sequelize
fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


// eslint-disable-next-line
// just to allow the usage of the sequelize objects with both capital and lower case
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
