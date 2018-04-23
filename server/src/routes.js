// policies
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const CourseControllerPolicy = require('./policies/CourseControllerPolicy');
const DepartmentControllerPolicy = require('./policies/DepartmentControllerPolicy');

// controllers
const AuthenticationController = require('./controllers/AuthenticationController');
const CourseController = require('./controllers/CourseController');
const DepartmentController = require('./controllers/DepartmentController');


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

  // ----Department

  app.post('/create_department',
    AuthenticationControllerPolicy.super_admin,
    DepartmentControllerPolicy.create,
    DepartmentController.create
  );

  app.post('/update_department',
    AuthenticationControllerPolicy.super_admin,
    DepartmentControllerPolicy.update,
    DepartmentController.update
  );

  app.post('/delete_department',
    AuthenticationControllerPolicy.super_admin,
    DepartmentControllerPolicy.hasId,
    DepartmentController.delete
  );

  app.get('/list_all_departments',
    AuthenticationControllerPolicy.authenticated,
    DepartmentController.list_all
  );
};
