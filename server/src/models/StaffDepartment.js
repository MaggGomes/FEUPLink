module.exports = (sequelize, DataTypes) => {
  const StaffDepartment = sequelize.define('StaffDepartment', {
  },
  {
    freezeTableName: true,
    hooks: {
      afterCreate: (staffDepartment, options) => {
        console.log('\n\n afterCreate \n\n', staffDepartment);
      },
      beforeUpdate: (instance, options) => {
        console.log('\n\n beforeUpdate \n\n');
      },
      beforeBulkUpdate: (b, a) => {
        console.log('\n\n beforeBulkUpdate \n\n', staffDepartment);
      },
      afterUpdate: (staffDepartment, options) => {
        console.log('\n\n afterUpdate \n\n', staffDepartment);
      },
    },
  });
  return StaffDepartment;
};
