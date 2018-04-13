const {Person} = require('../models');
const {Department} = require('../models');
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
        console.log(department);
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
      let code = req.query.code;
      let error = req.query.error;
      let state = req.query.state;
      // const person = await Person.create(req.body);
      console.log('\n\n code -> ' + code + ' error -> ' + error + ' state-> ' + state);

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

        await Person.create({
          name: `${userData.firstName}  ${userData.lastName}`,
          email: userData.emailAddress,
          headline: userData.headline,
          hashedPassword: 'password', // this is useless on the login with facebook
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
