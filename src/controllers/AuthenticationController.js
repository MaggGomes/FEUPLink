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
  signin(req, res) {
    res.send({
      message: `Logging in ${req.body.email}`,
    });
  },
};
