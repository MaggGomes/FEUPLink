const {Person} = require('../models');
const {Department} = require('../models');
const {Student} = require('../models');
const {Company} = require('../models');
const {Job} = require('../models');
const {Course} = require('../models');
const {Staff} = require('../models');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line
const axios = require('axios');

/**
 * Add two numbers.
 * @param {object} person person model object.
 * @return {string} user token.
 */
function jwtSignPerson(person) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(person, process.env.JWT_SECRET || 'secret', {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {

  async signup_student(req, res) {
      try {
        const person = await Person.create(req.body);

        const personJson = person.toJSON();

        const student = await Student.create({
          mecNumber: req.body.mecNumber,
          enrollmentDate: req.body.enrollmentDate,
          graduationDate: req.body.graduationDate,
          type: req.body.type,
          PersonId: personJson.id,
        });

        const course = await Course.create({
          name: req.body.course,
          creationDate: 2000,
        });

        Course.findById(course.toJSON().id).then((course) => {
          course.setStudents(student.toJSON().id);
        });

        if (!req.body.workExperience) {
          const company = await Company.create({
            name: req.body.company,
            type: req.body.companyType,
            industry: req.body.companyIndustry,
          });

          await Job.create({
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            isCurrent: req.body.isCurrent,
            CompanyId: company.toJSON().id,
            PersonId: personJson.id,
          });
        }
        res.send({
          person: personJson,
          token: jwtSignPerson(personJson),
        });
      } catch (err) {
        res.status(400).send({
          error: err,
        });
      }
  },
  async signup_staff(req, res) {
    try {
      const person = await Person.create(req.body);

      const personJson = person.toJSON();

      const staff = await Staff.create({
        mecNumber: req.body.mecNumber,
        jobStart: req.body.startDate,
        jobEnd: req.body.endDate,
        workingLocation: req.body.workingLocation,
        PersonId: personJson.id,
      });

      const {dpName, acronym} = req.body;

        const department = await Department.create({
          name: dpName,
          acronym: acronym,
        });

        Staff.findById(staff.toJSON().id).then((staff) => {
          staff.setDepartments(department.toJSON().id);
        });
        if (!req.body.workExperience) {
          const company = await Company.create({
            name: req.body.company,
            type: req.body.companyType,
            industry: req.body.companyIndustry,
          });

          await Job.create({
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            isCurrent: req.body.isCurrent,
            CompanyId: company.toJSON().id,
            PersonId: personJson.id,
          });
        }
      res.send({
        person: personJson,
        token: jwtSignPerson(personJson),
      });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async signin(req, res) {
    try {
      const {email, hashedPassword} = req.body;
      const person = await Person.findOne({
        where: {
          email: email,
        },
      });

      if (!person) {
        return res.status(403).send({
          error: 'The login information was incorrect.',
        });
      }

      if (person.signIn_type !== 'normal') {
        return res.status(403).send({
          error: 'This is an external account.',
        });
      }

      const isPasswordValid = await person.comparePassword(hashedPassword);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect.',
        });
      }

      const personJson = person.toJSON();
      res.send({
        person: personJson,
        token: jwtSignPerson(personJson),
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login',
      });
    }
  },
  async signup_linkedin(req, res) {
    try {
      let code = req.query.code;
      let error = req.query.error;
      let state = req.query.state;

      if (state !== 'Feup-Link-state') {
        // send error this is possibly a CSRF attack.
        res.redirect(process.env.FRONT_END_URL);
      }

      if (typeof error !== 'undefined') {
        // send error object error and error_description available.
        res.redirect(process.env.FRONT_END_URL);
      }

       // get the access token
       let accessToken = (await axios.post('https://www.linkedin.com/oauth/v2/accessToken',
            `grant_type=authorization_code&` +
            `code=${code}&` +
            `redirect_uri=http://localhost:8081/signup_linkedin&` +
            `client_id=${process.env.IN_ID}&` +
            `client_secret=${process.env.IN_SECRET}`)).data.access_token;


        // get the user data
        let userData = (await axios.get('https://api.linkedin.com/v1/people/~:(first-name,last-name,headline,location,industry,summary,specialties,positions,picture-url,email-address)?format=json&' +
            `oauth2_access_token=${accessToken}`)).data;

        await Person.findOrCreate({
            where:
            {
              name: `${userData.firstName}  ${userData.lastName}`,
              email: userData.emailAddress,
              headline: userData.headline,
              hashedPassword: 'Password1', // this is useless on the login with facebook
              validated: false,
              country: userData.location.country.code,
              city: userData.location.name,
              summary: userData.summary,
              signIn_type: 'linkedin',
              gender: `Not Specified`,
              role: 'User',
            },
        });

        res.redirect(process.env.FRONT_END_URL);
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: err.message,
        });
      }
  },
  async signup_facebook(req, res) {
    try {
      let accessToken = req.accessToken;
      let userId = req.userId;
      // const person = await Person.create(req.body);
      console.log('\n\n accessToken -> ' + accessToken);

        let userData = (await axios.get(`https://graph.facebook.com/v2.11/${userId}/?fields=first_name,last_name,location,profile_pic,gender`)).data;

        await Person.create({
          name: `${userData.firstName}  ${userData.lastName}`,
          email: userData.emailAddress,
          headline: userData.headline,
          hashedPassword: 'Password1', // this is useless on the login with facebook
          validated: false,
          country: userData.location.country.code,
          city: userData.location.name,
          summary: userData.summary,
          signIn_type: 'linkedin',
          gender: `Male`,
          role: 'User',
        });

        res.redirect(process.env.FRONT_END_URL);
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: err.message,
        });
      }
  },
};
