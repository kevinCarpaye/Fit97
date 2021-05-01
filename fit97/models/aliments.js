'use strict';
module.exports = (sequelize, DataTypes) => {
  var aliments = sequelize.define('aliments', {
    id_aliment: DataTypes.INTEGER,
    famille: DataTypes.STRING,
    aliment: DataTypes.STRING,
    calorie: DataTypes.INTEGER,
    proteine: DataTypes.DOUBLE,
    glucide: DataTypes.DOUBLE,
    lipide: DataTypes.DOUBLE,
    quantite: DataTypes.DOUBLE,
    unite: DataTypes.STRING
  }, {});
  aliments.associate = function(models) {
    // associations can be defined here
  };
  return aliments;
};