module.exports = (sequelize, DataTypes) => {
    const CourseStudent = sequelize.define('CourseStudent', {
        enrollmentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        enrollmentDate_visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        graduationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        graduationDate_visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        freezeTableName: true,
        hooks: {
            afterCreate: (courseStudent, options) => {
              sequelize.models.Student.findById(courseStudent.dataValues.StudentId)
              .then((student) => {
                    sequelize.models.Person.findById(student.dataValues.PersonId)
                    .then((person)=>{
                        sequelize.models.Course.findById(courseStudent.dataValues.CourseId)
                        .then((course)=>{
                            person.addChannel(course.dataValues.ChannelId);
                        });
                    });
              });
            },
          },
          // To-Do Delete
    }
);
    return CourseStudent;
};
