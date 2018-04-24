const {
    Student,
    Staff,
    Job,
} = require('../models');

const jwt = require('jsonwebtoken');

module.exports = {
    async getPerson(req, res) {
        try {
            let person = jwt.verify(req.get('auth'), process.env.JWT_SECRET);

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
            let person = jwt.verify(req.get('auth'), process.env.JWT_SECRET);

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
            let person = jwt.verify(req.get('auth'), process.env.JWT_SECRET);

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

            return res.status(200).send({
                student: student,
                courses: studentCourses,
                experience: studentExperience,
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
            let person = jwt.verify(req.get('auth'), process.env.JWT_SECRET);

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
};
