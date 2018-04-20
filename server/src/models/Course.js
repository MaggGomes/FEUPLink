module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    acronym: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
  );

    Course.associate = (models) => {
      // Course can have many students
      Course.belongsToMany(models.Student,
        {
          through: 'CourseStudent',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );

      // Course can have many channels
      Course.hasMany(models.Channel,
        {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );
    };

  return Course;
};
