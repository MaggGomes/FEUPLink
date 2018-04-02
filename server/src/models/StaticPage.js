module.exports = (sequelize, DataTypes) => {
  const StaticPage = sequelize.define('StaticPage', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // we still need to discuss what will be editable in the static page
  },
  {
    freezeTableName: true,
  }
  );

  StaticPage.associate = (models) => {
    // Posts can have many static pages | this will probably be changed
    StaticPage.belongsToMany(models.Post,
      {
        through: 'PostStaticPage',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  };

  return StaticPage;
};
