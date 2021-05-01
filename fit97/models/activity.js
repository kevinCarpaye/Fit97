'use strict';
module.exports = (sequelize, DataTypes) => {
  var activity = sequelize.define('activity', {
    idSport: DataTypes.INTEGER,
    time: DataTypes.INTEGER,
    idutil: DataTypes.INTEGER
  }, {});
  activity.associate = function(models) {
    // associations can be defined here
  };
  return activity;
};