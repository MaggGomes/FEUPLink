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
    },
    {
        freezeTableName: true,
    }
);
    return CourseStudent;
};
