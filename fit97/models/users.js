'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    sex: DataTypes.STRING,
    fname: DataTypes.STRING,
    name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    mobile: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    city: DataTypes.STRING,
    postcode: DataTypes.INTEGER,
    country: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    //models.aliments.hasMany(models.consommations);
  };
  return users;
};