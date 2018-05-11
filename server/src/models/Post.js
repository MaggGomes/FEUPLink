module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    text: {
      type: DataTypes.STRING,
        allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['New', 'Job', 'Event', 'Education'],
      allowNull: false,
    },
    tags: {
      // eslint-disable-next-line
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
  );

  Post.associate = (models) => {
    // post can be shared in many channels
    Post.belongsToMany(models.Channel,
      {
        through: 'PostChannel',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );

    // a post can be shared in many newsletters
    Post.belongsToMany(models.Newsletter,
      {
        through: 'PostNewsletter',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );

    // static pages can have many posts
    Post.belongsToMany(models.StaticPage,
      {
        through: 'PostStaticPage',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  };

  return Post;
};
