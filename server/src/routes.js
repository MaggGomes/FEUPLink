const AuthenticationController = require('./controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

module.exports = (app) => {
  // ----Authentication

  app.post('/signup_student',
    AuthenticationControllerPolicy.signup,
    AuthenticationController.signup_student
  );

  app.post('/signup_staff',
    AuthenticationControllerPolicy.signup,
    AuthenticationController.signup_staff
  );

  app.post('/signin',
    AuthenticationController.signin
  );

  // Linked IN
  app.get('/signup_linkedin',
    AuthenticationController.signup_linkedin
  );
};

