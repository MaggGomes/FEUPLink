const AuthenticationController = require('./controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

module.exports = (app) => {
  // ----Authentication

  app.post('/signup',
    AuthenticationControllerPolicy.signup,
    AuthenticationController.signup
  );

  app.post('/signin',
    AuthenticationController.signin
  );
};

