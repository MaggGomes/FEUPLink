module.exports = (sequelize, DataTypes) => {
  const ChannelMembers = sequelize.define('ChannelMembers', {
      isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
      isVisible: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
      },
  },
  {
      freezeTableName: true,
  }
);
  return ChannelMembers;
};
