module.exports = (app) => {
  app.get('/', function(req, res) {
    res.send({
      message: 'FEUPLink',
    });
  });

  // ----Authentication

  app.get('/team', function(req, res) {
    res.send({
      message: 'hello team-c',
    });
  });

  app.post('/signup', function(req, res) {
    res.send({
      message: `hello ${req.body.email}`,
    });
  });

  //
};
