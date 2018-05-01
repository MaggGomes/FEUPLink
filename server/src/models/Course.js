module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    academicDegree: {
      type: DataTypes.ENUM,
      values: ['Bachelor', 'Masters', 'Integrated Master', 'PhD'],
      defaultValue: 'Bachelor',
      allowNull: false,
    },
    acronym: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    hooks: {
      afterCreate: (course, options) => {
        sequelize.models.Channel.create({
          name: `${course.dataValues.name} Channel`,
        }).then((channel)=> {
            course.setChannel(course.dataValues.id);
        });
      },
    },
  },
  );

    Course.associate = (models) => {
      // Course can have many students
      Course.belongsToMany(models.Student,
        {
          through: models.CourseStudent,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );

      // Course can have many channels
      Course.belongsTo(models.Channel,
        {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );

      // Course belongs to a department
      Course.belongsTo(models.Department,
        {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );
    };

  return Course;
};
