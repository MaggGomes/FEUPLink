// policies
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const CourseControllerPolicy = require('./policies/CourseControllerPolicy');
const PostControllerPolicy = require('./policies/PostControllerPolicy');

// controllers
const AuthenticationController = require('./controllers/AuthenticationController');
const CourseController = require('./controllers/CourseController');
const PostController = require('./controllers/PostController');


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

  // ----Course

  app.post('/create_course',
    AuthenticationControllerPolicy.super_admin,
    CourseControllerPolicy.create,
    CourseController.create
  );

  app.post('/update_course',
    AuthenticationControllerPolicy.super_admin,
    CourseControllerPolicy.update,
    CourseController.update
  );

  app.post('/delete_course',
    AuthenticationControllerPolicy.super_admin,
    CourseControllerPolicy.hasId,
    CourseController.delete
  );

  app.get('/list_all_courses',
    AuthenticationControllerPolicy.authenticated,
    CourseController.list_all
  );

    // ----Post

  app.post('/post',
      AuthenticationControllerPolicy.super_admin,
      PostControllerPolicy.create,
      PostController.create
  );

  app.put('/post',
      AuthenticationControllerPolicy.super_admin,
      PostControllerPolicy.update,
      PostController.update
  );

  app.delete('/post',
      AuthenticationControllerPolicy.super_admin,
      PostControllerPolicy.hasId,
      PostController.delete
  );

  // Returns all posts
  app.get('/post',
      AuthenticationControllerPolicy.authenticated,
      PostController.list_all
  );

  // Returns all post from a specified type
  app.get('/post/:type',
      AuthenticationControllerPolicy.authenticated,
      PostController.list_by_type
  );
};
