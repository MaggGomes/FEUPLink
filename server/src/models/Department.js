module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acronym: {
      type: DataTypes.STRING,
      allowNull: false,
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
    };

  return Department;
};
