const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

module.exports = (app) => {
  // ----Authentication
  app.post('/signin',
    AuthenticationControllerPolicy.signin,
    AuthenticationController.signin
  );

  app.post('/signup_student',
    AuthenticationControllerPolicy.signup_student,
    AuthenticationController.signup_student
  );

  app.post('/signup_staff',
    AuthenticationControllerPolicy.signup_staff,
    AuthenticationController.signup_staff
  );

  app.post('/signup_linkedin',
    AuthenticationControllerPolicy.signup_linkedin,
    AuthenticationController.signup_linkedin
  );

  app.post('/continue_signup_linkedin',
    AuthenticationControllerPolicy.authenticated,
    AuthenticationControllerPolicy.continue_signup_linkedin,
    AuthenticationController.continue_signup_linkedin
  );

  app.post('/signup_facebook',
    AuthenticationController.signup_facebook
  );

  app.post('/continue_signup_facebook',
    AuthenticationControllerPolicy.authenticated,
    AuthenticationControllerPolicy.continue_signup_facebook,
    AuthenticationController.continue_signup_facebook
  );
};

