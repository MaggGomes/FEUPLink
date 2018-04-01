const {Person} = require('../models')

module.exports = {
  async signup(req, res) {
      try {
        const person = await Person.create(req.body);        
        res.send(user.toJSON());
      } catch(err) {
        res.status(400).send({
          error: err
        })
      }
  },
  async signin(req, res) {
    try {
      const {email, hashedPassword} = req.body
      const person = await Person.findOne({
        where: {
          email: email
        }
      })

      if(!person) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const isPasswordValid = hashedPassword === person.hashedPassword
      if(!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const personJson = person.toJSON()
      res.send({
        person: personJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  },
};
