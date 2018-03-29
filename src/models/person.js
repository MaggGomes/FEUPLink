module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Person', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });
};
