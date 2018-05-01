// policies
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const CourseControllerPolicy = require('./policies/CourseControllerPolicy');
const DepartmentControllerPolicy = require('./policies/DepartmentControllerPolicy');
const PostControllerPolicy = require('./policies/PostControllerPolicy');

// controllers
const AuthenticationController = require('./controllers/AuthenticationController');
const CourseController = require('./controllers/CourseController');
const PersonController = require('./controllers/PersonController');
// const PersonControllerPolicy = require('./policies/PersonControllerPolicy');
const DepartmentController = require('./controllers/DepartmentController');
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
    AuthenticationControllerPolicy.signup_facebook,
    AuthenticationController.signup_facebook
  );

  app.post('/continue_signup_facebook',
    AuthenticationControllerPolicy.authenticated,
    AuthenticationControllerPolicy.continue_signup_facebook,
    AuthenticationController.continue_signup_facebook
  );

  app.get('/getPerson',
    PersonController.getPerson
  );

  app.get('/getTypeOfPerson',
    PersonController.getTypeOfPerson
  );

  app.get('/getStudent',
    PersonController.getStudent
  );

  app.post('/create_job',
    PersonController.insertExperience
  );

  app.post('/create_course_student',
    PersonController.insertCourseStudent
  );

  app.post('/update_job',
    PersonController.updateJobExperience
  );

  app.post('/update_course_student',
    PersonController.updateCourseStudent
  );

  app.post('/delete_job',
    PersonController.deleteJobExperience
  );

  app.post('/delete_course_student',
    PersonController.deleteCourseStudent
  );
  // ----Course

  app.post('/create_course',
    AuthenticationControllerPolicy.super_admin,
    CourseControllerPolicy.create,
    CourseController.create
  );

  app.put('/update_course',
    AuthenticationControllerPolicy.super_admin,
    CourseControllerPolicy.update,
    CourseController.update
  );

  app.delete('/delete_course',
    AuthenticationControllerPolicy.super_admin,
    CourseControllerPolicy.hasId,
    CourseController.delete
  );

  app.get('/list_all_courses',
    CourseController.list_all
  );

  app.get('/list_courses_in_range/:from-:numInstances',
    CourseController.list_courses_range
  );

  app.get('/count_courses',
    CourseController.num_courses
  );

  // ----Department

  app.post('/create_department',
    AuthenticationControllerPolicy.super_admin,
    DepartmentControllerPolicy.create,
    DepartmentController.create
  );

  app.put('/update_department',
    AuthenticationControllerPolicy.super_admin,
    DepartmentControllerPolicy.update,
    DepartmentController.update
  );

  app.delete('/delete_department',
    AuthenticationControllerPolicy.super_admin,
    DepartmentControllerPolicy.hasId,
    DepartmentController.delete
  );

  app.get('/list_all_departments',
    DepartmentController.list_all
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
