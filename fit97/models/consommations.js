'use strict';
module.exports = (sequelize, DataTypes) => {
  var consommations = sequelize.define('consommations', {
    idutil: DataTypes.INTEGER,
    idalim: DataTypes.INTEGER,
    nombre: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  consommations.associate = function(models) {
    // associations can be defined here
  };
  return consommations;
};