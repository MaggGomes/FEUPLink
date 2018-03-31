const AuthenticationControllers = require('./controllers/AuthenticationController');

module.exports = (app) => {
  // ----Authentication

  app.post('/signup',
    AuthenticationControllers.signup
  );

  app.post('/signin',
    AuthenticationControllers.signin
  );
};

