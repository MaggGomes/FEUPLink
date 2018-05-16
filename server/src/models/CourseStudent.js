module.exports = (sequelize, DataTypes) => {
    const CourseStudent = sequelize.define('CourseStudent', {
        enrollmentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        graduationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isVisible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
    }
);
    return CourseStudent;
};
