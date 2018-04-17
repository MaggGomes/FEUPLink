const AuthenticationController = require('./controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

module.exports = (app) => {
  // ----Authentication

  app.post('/signup_student',
    AuthenticationController.signup_student
  );

  app.post('/signup_staff',
    AuthenticationControllerPolicy.signup,
    AuthenticationController.signup_staff
  );

  app.post('/signup_linkedin',
    AuthenticationController.signup_linkedin
  );

  app.post('/signup_facebook',
    AuthenticationController.signup_facebook
  );

  app.post('/signin',
  AuthenticationController.signin
  );
};

