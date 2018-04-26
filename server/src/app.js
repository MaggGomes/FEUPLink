// loading environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// eslint-disable-next-line
const {sequelize, Person, Course, Department} = require('./models');
// const createServer = require('auto-sni');

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

      // Todo make a proper script
      let departments = {
        'Automação, Instrumentação e Controlo': {
          'departmentName': 'Engenharia Mecânica',
          'departmentAcronym': 'EM',
        },
        'Bioengenharia': {
          'departmentName': 'Engenharia Química',
          'departmentAcronym': 'EQ',
        },
        'Ciência da Informação': {
          'departmentName': 'Engenharia Informática ',
          'departmentAcronym': 'EI',
        },
      };

      let courses = {
        'Automação, Instrumentação e Controlo': {
          'courseName': 'Automação, Instrumentação e Controlo',
          'academicDegree': 'Masters',
          'acronym': 'MAIC',
          'departmentId': 1,
          'website': '',
          'creationDate': '1990-05-01',
          'endDate': null,
        },
        'Bioengenharia': {
          'courseName': 'Bioengenharia',
          'academicDegree': 'Masters',
          'acronym': 'MIB',
          'departmentId': 2,
          'website': '',
          'creationDate': '1990-05-02',
          'endDate': null,
        },
        'Ciência da Informação': {
          'courseName': 'Ciência da Informação',
          'academicDegree': 'Masters',
          'acronym': 'MCI',
          'departmentId': 3,
          'website': '',
          'creationDate': '1990-05-03',
          'endDate': null,
        },
        'Ciência e Tecnologia de Polímeros': {
          'courseName': 'Ciência e Tecnologia de Polímeros',
          'academicDegree': 'Masters',
          'acronym': 'PDCTP',
          'departmentId': 2,
          'website': '',
          'creationDate': '1990-05-04',
          'endDate': null,
        },
      };
      /* eslint-disable */
      for (let key in departments) {
         Department.findOrCreate({
          where: {
            name: departments[key].departmentName,
          },
          defaults: {
            name: departments[key].departmentName,
            acronym: departments[key].departmentAcronym,
          },
        });
      }

      for (let key in courses) {
        Course.findOrCreate({
          where: {
            name: courses[key].courseName,
          },
          defaults: {
            name: courses[key].courseName,
            academicDegree: courses[key].academicDegree,
            acronym: courses[key].acronym,
            description: '',
            website: courses[key].website,
            creationDate: courses[key].creationDate,
            endDate: courses[key].endDate,
            DepartmentId: courses[key].departmentId,
          },
        });
      }
      /* eslint-enable */

      console.log(`FEUPLink started on port ${process.env.PORT}`);
    });
  });


module.exports = app;

