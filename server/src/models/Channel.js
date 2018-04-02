module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
  );

  Channel.associate = (models) => {
      // channel can have many administrators
      Channel.belongsToMany(models.Person,
        {
          through: 'ChannelAdmins',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );

      // channel can have many members
      Channel.belongsToMany(models.Person,
        {
          through: 'ChannelMembers',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      );
    };

  return Channel;
};
