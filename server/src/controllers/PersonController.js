const {
    Person,
    Student,
    Staff,
    Job,
    Company,
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
                where: {
                    id: req.query.id,
                },
            });

            let student = await Student.findOne({
                attributes: ['id', 'name', 'gender', 'phone', 'birthDate', 'city', 'country', 'email'],
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
                where: {
                    id: req.query.id,
                },
            });

            let staff = await Staff.findOne({
                attributes: ['id', 'name', 'gender', 'phone', 'birthDate', 'city', 'country', 'email'],
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
};
