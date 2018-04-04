module.exports = (sequelize, DataTypes) => {
  const Newsletter = sequelize.define('Newsletter', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
  );

  Newsletter.associate = (models) => {
    // the newsletter has one person associated (the creator)
    Newsletter.hasOne(models.Person);

    // a post can be shared in many newsletters
    Newsletter.belongsToMany(models.Post,
      {
        through: 'PostNewsletter',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );

     // Channels have many newletters
     Newsletter.belongsToMany(models.Channel,
      {
        through: 'ChannelNewsletter',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  };

  return Newsletter;
};
