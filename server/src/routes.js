const AuthenticationController = require('./controllers/AuthenticationController');

// const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

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

  app.post('/signup_facebook',
    AuthenticationController.signup_facebook
  );

  // to test the permission management
  app.get('/authenticated_user',
    AuthenticationControllerPolicy.authenticated
  );

  app.get('/channel_admin_user',
    AuthenticationControllerPolicy.channel_admin
  );

  app.get('/super_admin_user',
    AuthenticationControllerPolicy.super_admin,
    function(req, res, next) {
      console.log('control');
    }
  );
};

