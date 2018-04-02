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
      gender: {
        type: DataTypes.ENUM,
        values: ['Male', 'Female', 'Not Specified'],
        defaultValue: 'Not Specified',
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      headline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebookProfile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkedInProfile: {
        type: DataTypes.STRING,
        allowNull: true,
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
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ['User', 'Channel Admin', 'Super Admin'],
        defaultValue: 'User',
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
    // many-to-many channel admins
    Person.belongsToMany(models.Channel,
      {
        through: 'ChannelAdmins',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );

    // many-to-many users on the channel
    Person.belongsToMany(models.Channel,
      {
        through: 'ChannelMembers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );

    // many-to-many person - department
    Person.belongsToMany(models.Department,
      {
        through: 'PersonDepartment',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  };

  return Person;
};
