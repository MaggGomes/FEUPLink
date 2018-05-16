const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

/**
 * Add two numbers.
 * @param {object} person person model object.
 * @param {object} options option object.
 * @return {string} new hashed password.
 */
function hashPassword(person, options) {
  const SALT_FACTOR = 8;

  if (!person.changed('hashedPassword')) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(person.hashedPassword, salt, null))
    .then((hash) => {
      person.setDataValue('hashedPassword', hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ['Male', 'Female', 'Not Specified'],
        defaultValue: 'Not Specified',
        allowNull: false,
      },
      gender_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      birthDate_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      headline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      headline_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      summary: { // eslint-disable-next-line
        type: DataTypes.STRING(2500),
        allowNull: true,
      },
      summary_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      facebookProfile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebookProfile_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      linkedInProfile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkedInProfile_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      whatsAppProfile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whatsAppProfile_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      instagramProfile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagramProfile_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      validated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      email_visibility: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      signIn_type: {
        type: DataTypes.ENUM,
        values: ['normal', 'facebook', 'linkedin'],
        defaultValue: 'normal',
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ['User', 'Channel Admin', 'Super Admin'],
        defaultValue: 'User',
        allowNull: false,
      },
      experienceVisible: {
        type: DataTypes.ENUM,
        values: ['All Users', 'Channel Admins', 'Super Admins'],
        defaultValue: 'All Users',
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      hooks: {
        beforeUpdate: hashPassword,
        beforeSave: hashPassword,
      },
    }
  );

  Person.prototype.comparePassword = function(password) {
    return bcrypt.compareAsync(password, this.hashedPassword);
  };

  Person.associate = (models) => {
    // many-to-many users on the channel
    Person.belongsToMany(models.Channel,
      {
        through: models.ChannelMembers,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
    // person can have many jobs
    Person.hasMany(models.Job,
      {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );

    // person can create many posts
    Person.hasMany(models.Post,
      {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  };

  return Person;
};
