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
    }
);
    return CourseStudent;
};
