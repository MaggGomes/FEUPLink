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
      // many-to-many person - department
      Department.belongsToMany(models.Person,
        {
          through: 'PersonDepartment',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );
    };

  return Department;
};
