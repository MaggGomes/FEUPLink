module.exports = (app) => {
  app.get('/', function(req, res) {
    res.send({
      message: 'FEUPLink',
    });
  });

  app.get('/team', function(req, res) {
    res.send({
      message: 'hello team-c',
    });
  });
};
