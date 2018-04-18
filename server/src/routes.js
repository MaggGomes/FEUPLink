const AuthenticationController = require('./controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

module.exports = (app) => {
  // ----Authentication
<<<<<<< HEAD

=======
>>>>>>> 8deb34dd81297d90710f0cbb52fe83e973178edc
  app.post('/signup_student',
    AuthenticationController.signup_student
  );

  app.post('/signup_staff',
    AuthenticationControllerPolicy.signup,
    AuthenticationController.signup_staff
  );

  app.get('/signup_linkedin',
    AuthenticationController.signup_linkedin
  );

  app.post('/signup_facebook',
    AuthenticationController.signup_facebook
  );

  app.post('/signin',
<<<<<<< HEAD
  AuthenticationController.signin
  );
};

=======
    AuthenticationController.signin
  );
};
>>>>>>> 8deb34dd81297d90710f0cbb52fe83e973178edc
