module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    mecNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    jobStart: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    jobEnd: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    workingLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
  );

    Staff.associate = (models) => {
      // Staff will have fk to person
      Staff.belongsTo(
        models.Person,
        {
          foreignKey: {
            allowNull: false,
          },
          onDelete: 'CASCADE',
        }
      );

      // many-to-many staff - department
      Staff.belongsToMany(models.Department,
        {
          through: 'StaffDepartment',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );
    };

  return Staff;
};
