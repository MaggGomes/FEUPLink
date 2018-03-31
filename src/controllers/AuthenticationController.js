module.exports = {
  signup(req, res) {
      res.send({
        message: `Registering ${req.body.email}`,
    });
  },
  signin(req, res) {
    res.send({
      message: `Logging in ${req.body.email}`,
    });
  },
};
