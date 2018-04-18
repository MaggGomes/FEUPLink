const {
  Person,
  Department,
  Student,
  Course,
  Company,
  Job,
} = require('../models');
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
  // Todo: give errors like, email has already been taken
  async signup_student(req, res) {
      console.log('student');

      try {
        const person = await Person.create(req.body);

        const personJson = person.toJSON();

        const {dpName, acronym} = req.body;

        const department = await Department.create({
          name: dpName,
          acronym: acronym,
        });

        Person.findById(personJson.id).then((person) => {
          person.setDepartments(department.toJSON().id);
        });

        const student = await Student.create({
          mecNumber: req.body.mecNumber,
          enrollmentDate: req.body.enrollmentDate,
          graduationDate: req.body.graduationDate,
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
            industry: req.body.companyCity,
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
      console.log('staff');
      const person = await Person.create(req.body);

      const personJson = person.toJSON();
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
      let code = req.body.code;
      let error = req.body.error;
      let state = req.body.state;

      if (state !== 'Feup-Link-state') {
        // send error this is possibly a CSRF attack.
        return res.status(500).send({
          error: 'Wrong linkedin state',
        });
      }

      if (error !== null) {
        // send error object error and error_description available.
        return res.status(500).send({
          error: error,
        });
      }

       // get the access token
       let accessToken = (await axios.post('https://www.linkedin.com/oauth/v2/accessToken',
            `grant_type=authorization_code&` +
            `code=${code}&` +
            `redirect_uri=${process.env.FRONT_END_URL}/linkedin&` +
            `client_id=${process.env.IN_ID}&` +
            `client_secret=${process.env.IN_SECRET}`)).data.access_token;

        // get the user data
        let userData = (await axios.get('https://api.linkedin.com/v1/people/~:(first-name,last-name,headline,location,industry,summary,specialties,positions,picture-url,email-address)?format=json&' +
            `oauth2_access_token=${accessToken}`)).data;


        let seqUser = (await Person.findOne({where: {email: userData.emailAddress}}));
        let personData= '';

        if (seqUser == null) {
          personData = (await Person.create(
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
            })).dataValues;
        } else {
          personData = seqUser.dataValues;
        }

        // insert user positions and companies in the database
        for (let position of userData.positions.values) {
          if ('company' in position) { // check if the key is in
            let company = (await Company.findOrCreate({
              where: {
                name: position.company.name,
              },
              defaults: {
                type: position.company.type,
                industry: position.company.industry,
              }}))[0].dataValues;

            (await Job.findOrCreate({
              where: {
                title: position.title,
                PersonId: personData.id,
              },
              defaults: {
                startDate: `${position.startDate.year}-${position.startDate.month}`,
                endDate: null,
                isCurrent: position.isCurrent,
                CompanyId: company.id,
            }}));
          }
        };

        // return the user token, to allow him to make further requests to the API
        return res.status(200).send({
          person: personData,
          token: jwtSignPerson(personData),
        });
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
          signIn_type: 'facebook',
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
