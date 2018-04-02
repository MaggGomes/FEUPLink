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

    // post can be shared in many channels
    Channel.belongsToMany(models.Post,
      {
        through: 'PostChannel',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );

    // Newsletters can be in many channels
    Channel.belongsToMany(models.Newsletter,
      {
        through: 'ChannelNewsletter',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  };

  return Channel;
};
