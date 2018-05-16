const {
    Person,
    Student,
    Staff,
    Job,
    Company,
    CourseStudent,
    Course,
} = require('../models');

module.exports = {
    async getPerson(req, res) {
        try {
            let person = await Person.findOne({
                where: {
                    id: req.body.id,
                },
            });

            return res.status(200).send({
                person: person,
            });
        } catch (err) {
            console.log('err: ', err);
            res.status(400).send({
                error: err,
            });
        }
    },
    async getTypeOfPerson(req, res) {
        try {
            let result;
            let person = await Person.findOne({
                where: {
                    id: req.query.id,
                },
            });
            let student = await Student.findOne({
                where: {
                    PersonId: person.id,
                },
            });

            if (student == null) {
                let staff = await Staff.findOne({
                    where: {
                        PersonId: person.id,
                    },
                });
                if (staff !== null) {
                    result = 'staff';
                }
            } else {
                result = 'student';
            }

            return res.status(200).send({
                type: result,
            });
        } catch (err) {
            console.log('err: ', err);
            res.status(400).send({
                error: err,
            });
        }
    },
    async getStudent(req, res) {
        try {
            let person = await Person.findOne({
                attributes: ['id', 'name', 'name_visibility', 'gender', 'gender_visibility', 'phone',
                'phone_visibility', 'birthDate', 'birthDate_visibility', 'city', 'city_visibility',
                'country', 'country_visibility', 'email', 'email_visibility', 'facebookProfile',
                'facebookProfile_visibility', 'linkedInProfile', 'linkedInProfile_visibility',
                'whatsAppProfile', 'whatsAppProfile_visibility', 'instagramProfile', 'instagramProfile_visibility', 'experienceVisible'],
                where: {
                    id: req.query.id,
                },
            });

            let student = await Student.findOne({
                where: {
                    PersonId: person.id,
                },
            });

            let studentCourses = await student.getCourses();

            let studentExperience = await Job.findAll({
                where: {
                    PersonId: person.id,
                },
            });

            let stdExperience = [];
            for (let i = 0; i < studentExperience.length; i++) {
                let companyId = studentExperience[i].CompanyId;
                let company = await Company.findOne({
                    where: {
                        id: companyId,
                    },
                });
                stdExperience.push({
                    job: studentExperience[i],
                    companyName: company.name,
                });
            }

            return res.status(200).send({
                person: person,
                student: student,
                courses: studentCourses,
                experience: stdExperience,
            });
        } catch (err) {
            console.log('err: ', err);
            res.status(400).send({
                error: err,
            });
        }
    },
    async getStaff(req, res) {
        try {
            let person = await Person.findOne({
                attributes: ['id', 'name', 'gender', 'phone', 'birthDate', 'city', 'country', 'email'],
                where: {
                    id: req.query.id,
                },
            });

            let staff = await Staff.findOne({
                where: {
                    PersonId: person.id,
                },
            });

            let staffDepartments = await staff.getDepartments();

            let staffExperience = await Job.findAll({
                where: {
                    PersonId: person.id,
                },
            });
            return res.status(200).send({
                person: person,
                staff: staff,
                departments: staffDepartments,
                experience: staffExperience,
            });
        } catch (err) {
            console.log('err: ', err);
            res.status(400).send({
                error: err,
            });
        }
    },
    async insertExperience(req, res) {
        try {
            const company = (await Company.findOrCreate({
                where: {
                    name: req.body.company,
                },
                defaults: {
                    name: req.body.company,
                },
            }))[0].dataValues;

            await Job.create({
                title: req.body.title,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                isCurrent: req.body.isCurrent,
                CompanyId: company.id,
                PersonId: req.body.personId,
            });

            res.status(201).send({
                res: 'Job successfully created',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async insertCourseStudent(req, res) {
        try {
            const course = (await Course.findOne({
                where: {
                    name: req.body.name,
                    academicDegree: req.body.academicDegree,
                },
            }));
            const student = (await Student.findOne({
                where: {
                    PersonId: req.body.PersonId,
                },
            }));

            await CourseStudent.create({
                enrollmentDate: req.body.enrollmentDate,
                graduationDate: req.body.graduationDate,
                CourseId: course.toJSON().id,
                StudentId: student.toJSON().id,
            });

            res.status(201).send({
                res: 'Course successfully associated to student',
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: err,
            });
        }
    },
    async updateJobExperience(req, res) {
        try {
            const personId = req.body.personId;
            delete req.body.personId;
            const company = (await Company.findOne({
                where: {
                    name: req.body.company,
                },
            }));
            delete req.body.company;

            (await Job.update(
                req.body, {
                    where: {
                        CompanyId: company.toJSON().id,
                        PersonId: personId,
                    },
                }));
            res.status(201).send({
                res: 'Successfully updated the job information',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async updateCourseStudent(req, res) {
        try {
            const student = (await Student.findOne({
                where: {
                    PersonId: req.body.PersonId,
                },
            }));
            delete req.body.PersonId;

            const course = (await Course.findOne({
                where: {
                    name: req.body.name,
                    academicDegree: req.body.academicDegree,
                },
            }));
            delete req.body.name;
            delete req.body.academicDegree;
            (await CourseStudent.update(
                req.body, {
                    where: {
                        CourseId: course.toJSON().id,
                        StudentId: student.toJSON().id,
                    },
                }));
            res.status(201).send({
                res: 'Successfully updated the course student information',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async deleteJobExperience(req, res) {
        try {
            const personId = req.body.personId;
            delete req.body.personId;
            const company = (await Company.findOne({
                where: {
                    name: req.body.company,
                },
            }));
            delete req.body.company;

            (await Job.destroy({
                where: {
                    CompanyId: company.toJSON().id,
                    PersonId: personId,
                },
            }));
            res.status(201).send({
                res: 'Job successfully deleted',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async deleteCourseStudent(req, res) {
        try {
            const student = (await Student.findOne({
                where: {
                    PersonId: req.body.PersonId,
                },
            }));
            delete req.body.PersonId;

            const course = (await Course.findOne({
                where: {
                    name: req.body.name,
                    academicDegree: req.body.academicDegree,
                },
            }));
            delete req.body.name;
            delete req.body.academicDegree;
            (await CourseStudent.destroy({
                where: {
                    CourseId: course.toJSON().id,
                    StudentId: student.toJSON().id,
                },
            }));
            res.status(201).send({
                res: 'Successfully updated the course student information',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async update(req, res) {
        try {
            const userId = req.body.userId;
            delete req.body.userId;

            (await Person.update(
                req.body, {
                    where: {
                        id: userId,
                    },
                }));

            res.status(200).send({
                res: 'Successfully updated the post information',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async updateExperienceVisibility(req, res) {
        try {
            const userId = req.body.personId;
            delete req.body.personId;

            (await Person.update(
                req.body, {
                    where: {
                        id: userId,
                    },
                }));

            res.status(200).send({
                res: 'Successfully updated the experience visibility',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
    async updateEducationVisibility(req, res) {
        try {
            const userId = req.body.personId;
            delete req.body.personId;

            (await Student.update(
                req.body, {
                    where: {
                        PersonId: userId,
                    },
                }));

            res.status(200).send({
                res: 'Successfully updated the education visibility',
            });
        } catch (err) {
            res.status(400).send({
                error: err,
            });
        }
    },
};
