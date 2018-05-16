// policies
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const CourseControllerPolicy = require('./policies/CourseControllerPolicy');
const DepartmentControllerPolicy = require('./policies/DepartmentControllerPolicy');
// const ChannelControlerPolicy = require('./policies/ChannelControlerPolicy');
const PostControllerPolicy = require('./policies/PostControllerPolicy');
// const PersonControllerPolicy = require('./policies/PersonControllerPolicy');

// controllers
const AuthenticationController = require('./controllers/AuthenticationController');
const CourseController = require('./controllers/CourseController');
const DepartmentController = require('./controllers/DepartmentController');
const ChannelController = require('./controllers/ChannelController');
const PostController = require('./controllers/PostController');
const PersonController = require('./controllers/PersonController');

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

  app.post('/update_person',
    PersonController.update
  );

  app.post('/delete_course_student',
    PersonController.deleteCourseStudent
  );

  app.post('/update_experience_visibility',
    PersonController.updateExperienceVisibility
  );

  app.post('/update_education_visibility',
    PersonController.updateEducationVisibility
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

  app.get('/list_departments_in_range/:from-:numInstances',
    DepartmentController.list_departments_range
  );

  app.get('/count_departments',
    DepartmentController.num_departments
  );


  // ----Channels
  app.put('/channel_update',
    AuthenticationControllerPolicy.channel_admin,
    ChannelController.update,
  );

  app.post('/add_channel_admin',
      AuthenticationControllerPolicy.channel_admin,
      ChannelController.add_channel_admin,
  );

  app.post('/remove_channel_admin',
    AuthenticationControllerPolicy.channel_admin,
    ChannelController.remove_channel_admin,
  );

  app.post('/set_channel_visibility',
    AuthenticationControllerPolicy.authenticated,
    ChannelController.set_channel_visibility,
  );

  app.get('/list_enrolled_channels_in_range/:PersonId/:from-:numInstances',
    AuthenticationControllerPolicy.authenticated,
    ChannelController.list_enrolled_channels,
  );

  app.get('/list_enrolled_channels/:PersonId',
      AuthenticationControllerPolicy.authenticated,
      ChannelController.list_all_enrolled_channels,
  );

  app.get('/num_enrolled_channels/:PersonId',
    AuthenticationControllerPolicy.authenticated,
    ChannelController.num_enrolled_channels,
  );

  app.get('/list_admin_channels_in_range/:PersonId/:from-:numInstances',
    AuthenticationControllerPolicy.authenticated,
    ChannelController.list_admin_channels,
  );

  app.get('/list_admin_channels/:PersonId',
      AuthenticationControllerPolicy.authenticated,
      ChannelController.list_all_admin_channels,
  );

  app.get('/num_admin_channels/:PersonId',
    AuthenticationControllerPolicy.authenticated,
    ChannelController.num_admin_channels,
  );

  app.get('/list_channels_in_range/:from-:numInstances',
    AuthenticationControllerPolicy.authenticated,
    ChannelController.list_channel_range,
  );

  app.get('/count_channels',
    AuthenticationControllerPolicy.authenticated,
    ChannelController.num_channels,
  );

  app.get('/channel_by_id/:ChannelId',
    AuthenticationControllerPolicy.authenticated,
    ChannelController.channel_by_id,
  );


    // ----Post

  app.post('/post',
      AuthenticationControllerPolicy.channel_admin,
      PostControllerPolicy.create,
      PostController.create
  );

  app.put('/post',
      AuthenticationControllerPolicy.channel_admin,
      PostControllerPolicy.update,
      PostController.update
  );

  app.delete('/post',
      AuthenticationControllerPolicy.authenticated,
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

    // Returns all post from the channels in which a user is enrolled
    app.get('/post/person/:PersonId',
        AuthenticationControllerPolicy.authenticated,
        PostController.list_enrolled_channels_posts
    );

    // Returns all post from the channels in which a user is enrolled
    app.get('/post/person/:PersonId/type/:type',
        AuthenticationControllerPolicy.authenticated,
        PostController.list_enrolled_channels_posts_by_type
    );
};
