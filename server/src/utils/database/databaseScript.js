/* eslint-disable */
const {
    Person,
    Course,
    Department,
    Student,
    CourseStudent,
    Company,
    Job,
    Staff,
    ChannelMembers,
} = require('../../models');

const DepartmentsAndCourses = require('./data/DepartmentsAndCourses.json');
const Students = require('./data/Students.json');
const Staffs = require('./data/Staff.json');

module.exports = {
    async populateDatabase() {

        // Create departments
        for (let key in DepartmentsAndCourses) {
            (await Department.findOrCreate({
                where: {
                    name: DepartmentsAndCourses[key].departmentName,
                },
                defaults: {
                    name: DepartmentsAndCourses[key].departmentName,
                    acronym: DepartmentsAndCourses[key].departmentAcronym,
                },
            }));
        }

        // Create courses
        for (let key in DepartmentsAndCourses) {
            const depId = (await Department.findOne({
                where: {
                    name: DepartmentsAndCourses[key].departmentName,
                },
            })).dataValues.id;

            if (DepartmentsAndCourses[key].creationDate === '') {
                DepartmentsAndCourses[key].creationDate = null;
            }


            if (DepartmentsAndCourses[key].endDate === '') {
                DepartmentsAndCourses[key].endDate = null;
            }

            Course.findOrCreate({
                where: {
                    name: DepartmentsAndCourses[key].courseName,
                },
                defaults: {
                    name: DepartmentsAndCourses[key].courseName,
                    academicDegree: DepartmentsAndCourses[key].academicDegree,
                    acronym: DepartmentsAndCourses[key].acronym,
                    description: DepartmentsAndCourses[key].description,
                    website: DepartmentsAndCourses[key].website,
                    creationDate: DepartmentsAndCourses[key].creationDate,
                    endDate: DepartmentsAndCourses[key].endDate,
                    DepartmentId: depId,
                },
            });
        }

        // Create users

        // insert default super admin user
        Person.findOrCreate({
            where: {
                email: 'admin@mail.com',
            },
            defaults: {
                name: 'Admin',
                name_visibility: false,
                hashedPassword: 'Password1',
                gender_visibility: false,
                email_visibility: false,
                role: 'Super Admin',
            },
        });


        async function createStudent(name, gender, email, hashedPassword, mecNumber, type, courseId,
                                     enrollmentDate, graduationDate, nameCompany, typeCompany, industry, title, startDate,
                                     endDate, isCurrent) {
            let person = (await Person.findOrCreate({
                where: {
                    email: email,
                },
                defaults: {
                    name: name,
                    gender: gender,
                    email: email,
                    hashedPassword: hashedPassword,
                },
            }))[0].dataValues;

            let student = (await Student.findOrCreate({
                where: {
                    mecNumber: mecNumber,
                },
                defaults: {
                    mecNumber: mecNumber,
                    type: type,
                    PersonId: person.id,
                },
            }))[0].dataValues;

            CourseStudent.findOrCreate({
                where: {
                    CourseId: courseId,
                    StudentId: student.id,
                },
                defaults: {
                    CourseId: courseId,
                    StudentId: student.id,
                    enrollmentDate: enrollmentDate,
                    graduationDate: graduationDate,
                },
            });

            // [Refactor] make all students of course 1 a channel admin
            if(courseId === 1){
                (await ChannelMembers.update(
                    {
                        isAdmin: true,
                    },
                    {
                        where: {
                            ChannelId: 1,
                            PersonId: person.id,
                        },
                    }
                ));

                (await Person.update(
                    {
                        role: 'Channel Admin',
                    },
                    {
                        where: {
                            id: person.id,
                        },
                    }
                ));

            }

            //----
            const company = (await Company.findOrCreate({
                where: {
                    name: nameCompany,
                },
                defaults: {
                    name: nameCompany,
                    type: typeCompany,
                    industry: industry,
                },
            }))[0].dataValues;

            Job.create({
                title: title,
                startDate: startDate,
                endDate: endDate,
                isCurrent: isCurrent,
                CompanyId: company.id,
                PersonId: person.id,
            });
        };

        async function createStaff(name, gender, email, hashedPassword, mecNumber, startDate, endDate, workingLocation, departmentId) {
            let person = (await Person.findOrCreate({
                where: {
                    email: email,
                },
                defaults: {
                    name: name,
                    gender: gender,
                    email: email,
                    hashedPassword: hashedPassword,
                },
            }))[0].dataValues;

            const staff = (await Staff.findOrCreate({
                where: {
                    PersonId: person.id,
                },
                defaults: {
                    mecNumber: mecNumber,
                    jobStart: startDate,
                    jobEnd: endDate,
                    workingLocation: workingLocation,
                },
            }))[0].dataValues;


            Staff.findById(staff.id).then((s) => {
                s.addDepartment(departmentId);
            });
        };

        // create students
        for (let key in Students) {
            await createStudent(
                Students[key].name,
                Students[key].gender,
                Students[key].email,
                Students[key].hashedPassword,
                Students[key].mecNumber,
                Students[key].type,
                Students[key].courseId,
                Students[key].enrollmentDate,
                Students[key].graduationDate,
                Students[key].nameCompany,
                Students[key].typeCompany,
                Students[key].industry,
                Students[key].title,
                Students[key].startDate,
                Students[key].endDate,
                Students[key].isCurrent,
            );
        }


        // create staffs
        for (let key in Staffs) {
            await createStaff(
                Staffs[key].name,
                Staffs[key].gender,
                Staffs[key].email,
                Staffs[key].hashedPassword,
                Staffs[key].mecNumber,
                Staffs[key].startDate,
                Staffs[key].endDate,
                Staffs[key].workingLocation,
                Staffs[key].departmentId,
            );
        }




    },
};
