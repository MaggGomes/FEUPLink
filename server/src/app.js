// loading environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// eslint-disable-next-line
const {
  sequelize,
  Person,
  Course,
  Department,
  Student,
  CourseStudent,
  Company,
  Job,
  Staff,
} = require('./models');
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

      async function createStudent(name, gender, email, hashedPassword, mecNumber, type, courseId,
      enrollmentDate, graduationDate, nameCompany, typeCompany, industry, title, startDate,
    endDate, isCurrent, ) {
        let person = (await Person.findOrCreate({
          where: {
            email: email,
          },
          defaults: {
            name: name,
            gender: gender,
            email: email,
            hashedPassword: hashedPassword,
          }
        }))[0].dataValues;

        let student = (await Student.findOrCreate({
          where: {
            mecNumber: mecNumber,
          },
          defaults: {
            mecNumber: mecNumber,
            type: type,
            PersonId: person.id,
          }
        }))[0].dataValues;
  
        CourseStudent.findOrCreate({
          where: {
            CourseId: courseId,
            StudentId: student.id,
          },
          defaults: {
            CourseId: courseId,
            StudentId: student.id,
            enrollmentDate: enrollmentDate,
            graduationDate: graduationDate,
          }
        });
  
        const company = (await Company.findOrCreate({
          where: {
            name: nameCompany,
          },
          defaults: {
            name: nameCompany,
            type: typeCompany,
            industry: industry,
          }
        }))[0].dataValues;
  
        Job.create({
          title: title,
          startDate: startDate,
          endDate: endDate,
          isCurrent: isCurrent,
          CompanyId: company.id,
          PersonId: person.id,
        });
      };

      async function createStaff(name, gender, email, hashedPassword, mecNumber, startDate, endDate, workingLocation, departmentId) {
        let person = (await Person.findOrCreate({
          where: {
            email: email,
          },
          defaults: {
            name: name,
            gender: gender,
            email: email,
            hashedPassword: hashedPassword,
          }
        }))[0].dataValues;

        const staff = (await Staff.findOrCreate({
          where: {
            PersonId: person.id,
          },
          defaults: {
            mecNumber: mecNumber,
            jobStart: startDate,
            jobEnd: endDate,
            workingLocation: workingLocation,
          },
        }))[0].dataValues;


        Staff.findById(staff.id).then((s) => {
          s.addDepartment(departmentId);
        });
      };

      createStudent('Paulo', 'Male', 'paulo@gmail.com', '1234paulo', '201403745', 'Actual Student',
      1, '2014-09', '2018-04', 'Microsoft', 'public', 'Technology', 'Developer', '2018-01', '2018-04', true);
      createStaff('José', 'Male', 'jose@gmail.com', '1234jose', '201403744', '2017-05', '2018-02', 'I001', 1);
      createStudent('Nuno', 'Male', 'nuno@gmail.com', '1234nuno', '201403743', 'Actual Student',
      1, '2014-09', '2018-04', 'Microsoft', 'public', 'Technology', 'Developer', '2018-01', '2018-04', true);
      createStaff('Manuel', 'Male', 'manuel@gmail.com', '1234manuel', '201403742', '2017-05', '2018-02', 'I001', 1);

      /* eslint-enable */
      console.log(`FEUPLink started on port ${process.env.PORT}`);
    });
  });


module.exports = app;

