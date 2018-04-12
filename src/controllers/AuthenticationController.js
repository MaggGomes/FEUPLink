const {Person} = require('../models');
const jwt = require('jsonwebtoken');

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
      console.log('\n\nLinkedIN-> ', req);
      console.log('\n\n\n\nLinkedIN query-> ', req.Url.query);
      res.redirect(`https://localhost:8080`);
    } catch (err) {
      res.status(400).send({
        error: err,
        oi: 'oi',
      });
    }
  },
};
