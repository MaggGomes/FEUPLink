module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
      mecNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
      mecNumber_visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['Actual Student', 'Mobility Student', 'Alumni'],
        defaultValue: 'Actual Student',
        allowNull: false,
      },
      type_visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      educationVisible: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );


  // It's not working
  Student.associate = (models) => {
    // Student will have fk to person
    Student.belongsTo(
      models.Person,
      {
        foreignKey: {
          allowNull: false,
        },
        onDelete: 'CASCADE',
      }
    );

    // Student can have many courses
    Student.belongsToMany(models.Course,
      {
        through: models.CourseStudent,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  };

  return Student;
};
