module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
      mecNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['Actual Student', 'Mobility Student', 'Alumni'],
        defaultValue: 'Actual Student',
        allowNull: false,
      },
      enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      graduationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cgpa: {
        type: DataTypes.REAL,
        allowNull: true,
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
        through: 'CourseStudent',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  };

  return Student;
};
