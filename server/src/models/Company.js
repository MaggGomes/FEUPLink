module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['public', 'private'],
      defaultValue: 'private',
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
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
