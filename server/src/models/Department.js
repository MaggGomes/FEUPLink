module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    acronym: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
  );

  Department.associate = (models) => {
      // many-to-many staff - department
    Department.belongsToMany(models.Staff,
        {
          through: 'StaffDepartment',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );

    // Departments can have many courses
    Department.hasMany(models.Course,
      {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  };

  return Department;
};
