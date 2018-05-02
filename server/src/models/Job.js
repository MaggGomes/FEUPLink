module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title_visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    summary_visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startDate_visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate_visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    isCurrent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isCurrent_visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
  );


  return Job;
};
