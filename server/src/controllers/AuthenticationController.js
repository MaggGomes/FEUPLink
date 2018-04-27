const {
  Person,
  Staff,
  Student,
  Course,
  Company,
  Job,
  CourseStudent,
} = require('../models');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line
const axios = require('axios');

/**
 * Add two numbers.
 * @param {object} person person model object.
 * @return {string} user token.
 */
function jwtSignPerson(person) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(person, process.env.JWT_SECRET || 'secret', {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  // Todo: give errors like, email has already been taken
  async signup_student(req, res) {
      try {
        const person = await Person.create(req.body);

        const personJson = person.toJSON();

        const student = await Student.create({
          mecNumber: req.body.mecNumber,
          type: req.body.type,
          PersonId: personJson.id,
        });

        (await CourseStudent.create({
          CourseId: req.body.courseId,
          StudentId: student.toJSON().id,
          enrollmentDate: req.body.enrollmentDate,
            graduationDate: req.body.graduationDate,
        }));

        if (!req.body.workExperience) {
          const company = await Company.create({
            name: req.body.company,
            type: req.body.companyType,
            industry: req.body.companyIndustry,
          });

          await Job.create({
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            isCurrent: req.body.isCurrent,
            CompanyId: company.toJSON().id,
            PersonId: personJson.id,
          });
        }

        res.send({
          person: personJson,
          token: jwtSignPerson(personJson),
        });
      } catch (err) {
        res.status(400).send({
          error: err,
        });
      }
  },
  async signup_staff(req, res) {
    try {
      const person = await Person.create(req.body);

      const personJson = person.toJSON();

      const staff = await Staff.create({
        mecNumber: req.body.mecNumber,
        jobStart: req.body.startDate,
        jobEnd: req.body.endDate,
        workingLocation: req.body.workingLocation,
        PersonId: personJson.id,
      });

      Staff.findById(staff.toJSON().id).then((staff) => {
        staff.addDepartment(req.body.departmentId);
      });

      if (!req.body.workExperience) {
        const company = await Company.create({
          name: req.body.company,
          type: req.body.companyType,
          industry: req.body.companyIndustry,
        });

        await Job.create({
          title: req.body.title,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          isCurrent: req.body.isCurrent,
          CompanyId: company.toJSON().id,
          PersonId: personJson.id,
        });
      }
      res.send({
        person: personJson,
        token: jwtSignPerson(personJson),
      });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async signin(req, res) {
    try {
      const {email, hashedPassword} = req.body;
      const person = await Person.findOne({
        where: {
          email: email,
        },
      });

      if (!person) {
        return res.status(403).send({
          error: 'The login information was incorrect.',
        });
      }

      if (person.signIn_type !== 'normal') {
        return res.status(403).send({
          error: 'This is an external account.',
        });
      }

      const isPasswordValid = await person.comparePassword(hashedPassword);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect.',
        });
      }

      const personJson = person.toJSON();
      res.send({
        person: personJson,
        token: jwtSignPerson(personJson),
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login',
      });
    }
  },
  async signup_linkedin(req, res) {
    try {
      let code = req.body.code;
      let error = req.body.error;
      let state = req.body.state;

      if (state !== 'Feup-Link-state') {
        // send error this is possibly a CSRF attack.
        return res.status(500).send({
          error: 'Wrong linkedin state',
        });
      }

      if (error !== null) {
        // send error object error and error_description available.
        return res.status(500).send({
          error: error,
        });
      }

       // get the access token
       let accessToken = (await axios.post('https://www.linkedin.com/oauth/v2/accessToken',
            `grant_type=authorization_code&` +
            `code=${code}&` +
            `redirect_uri=${process.env.FRONT_END_URL}/linkedin&` +
            `client_id=${process.env.IN_ID}&` +
            `client_secret=${process.env.IN_SECRET}`)).data.access_token;

        // get the user data
        let userData = (await axios.get('https://api.linkedin.com/v1/people/~:(first-name,last-name,headline,location,industry,summary,specialties,positions,picture-url,email-address)?format=json&' +
            `oauth2_access_token=${accessToken}`)).data;


        let seqUser = (await Person.findOne({where: {email: userData.emailAddress}}));
        let personData= '';

        if (seqUser == null) {
          personData = (await Person.create(
            {
              name: `${userData.firstName}  ${userData.lastName}`,
              email: userData.emailAddress,
              headline: userData.headline,
              hashedPassword: 'Password1', // this is useless on the login with facebook
              validated: false,
              country: userData.location.country.code,
              city: userData.location.name,
              summary: userData.summary,
              signIn_type: 'linkedin',
            })).dataValues;
        } else {
          personData = seqUser.dataValues;
        }

        // insert user positions and companies in the database
        for (let position of userData.positions.values) {
          if ('company' in position) { // check if the key is in
            let company = (await Company.findOrCreate({
              where: {
                name: position.company.name,
              },
              defaults: {
                type: position.company.type,
                industry: position.company.industry,
              }}))[0].dataValues;

            (await Job.findOrCreate({
              where: {
                title: position.title,
                PersonId: personData.id,
              },
              defaults: {
                startDate: `${position.startDate.year}-${position.startDate.month}`,
                endDate: null,
                isCurrent: position.isCurrent,
                CompanyId: company.id,
            }}));
          }
        };
        // check if the user has already completed the registration process with the remaining info
        let student = (await Student.findAll({
          where: {
            PersonId: personData.id,
          },
        }));

        let continueSignupLinkedin=false;

        if (student.length === 0) {
          let staff = (await Staff.findAll({
            where: {
              PersonId: personData.id,
            },
          }));

          if (staff.length === 0) {
            continueSignupLinkedin = true;
          }
        }

        // return the user token, to allow him to make further requests to the API
        return res.status(201).send({
          continueSignupLinkedin: continueSignupLinkedin,
          person: personData,
          token: jwtSignPerson(personData),
        });
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: err.message,
        });
      }
  },
  async continue_signup_linkedin(req, res) {
    try {
      let person = jwt.verify(req.get('auth'), process.env.JWT_SECRET);

      if (req.body.personType == 'student') {
        // check if there isn't already a staff member associated to the person
        let staff = (await Staff.findAll({
          where: {
            PersonId: person.id,
          },
        }));

        if (staff.length !== 0) {
          res.status(400).send({error: 'Person already associated to a staff account'});
          return;
        }
        // ----------------------

        const student = (await Student.findOrCreate({
          where: {
            PersonId: person.id,
          },
          defaults: {
            mecNumber: req.body.mecNumber,
            type: req.body.studenType,
            PersonId: person.id,
          },
        }))[0].dataValues;


        Course.findById(req.body.courseId).then((c) => {
          c.addStudent(student.id);
        });

        CourseStudent.findById([course.toJSON().id, student.toJSON().id]).then((cs) => {
          cs.setEnrollmentDate(req.body.enrollmentDate);
          cs.setGraduationDate(req.body.graduationDate);
        });
      } else {
        // check if there isn't already a student member associated to the person
        let student = (await Student.findAll({
          where: {
            PersonId: person.id,
          },
        }));

        if (student.length !== 0) {
          res.status(400).send({error: 'Person already associated to a student account'});
          return;
        }
        // ----------------------

        const staff = (await Staff.findOrCreate({
          where: {
            PersonId: person.id,
          },
          defaults: {
            mecNumber: req.body.mecNumber,
            jobStart: req.body.startDate,
            jobEnd: req.body.endDate,
            workingLocation: req.body.workingLocation,
          },
        }))[0].dataValues;


        Staff.findById(staff.id).then((s) => {
          s.addDepartment(req.body.departmentId);
        });
      }

      res.status(201).send();
    } catch (err) {
      console.log('err: ', err);
      res.status(400).send({
        error: err,
      });
    }
  },
  async signup_facebook(req, res) {
    try {
      let accessToken = req.accessToken;
      let userId = req.userId;
      // const person = await Person.create(req.body);
      console.log('\n\n accessToken -> ' + accessToken);

        let userData = (await axios.get(`https://graph.facebook.com/v2.11/${userId}/?fields=first_name,last_name,location,profile_pic,gender`)).data;

        await Person.create({
          name: `${userData.firstName}  ${userData.lastName}`,
          email: userData.emailAddress,
          headline: userData.headline,
          hashedPassword: 'Password1', // this is useless on the login with facebook
          validated: false,
          country: userData.location.country.code,
          city: userData.location.name,
          summary: userData.summary,
          signIn_type: 'facebook',
          gender: `Male`,
          role: 'User',
        });

        res.redirect(process.env.FRONT_END_URL);
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: err.message,
        });
      }
  },
};
