module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
  );

  Company.associate = (models) => {
    Company.hasMany(models.Job, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Company;
};
