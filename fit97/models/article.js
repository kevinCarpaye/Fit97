'use strict';
module.exports = (sequelize, DataTypes) => {
  var article = sequelize.define('article', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {});
  article.associate = function(models) {
    // associations can be defined here
  };
  return article;
};