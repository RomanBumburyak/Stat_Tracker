'use strict';
module.exports = function(sequelize, DataTypes) {
  var Stat = sequelize.define('Stat', {
    activityId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});

  Stat.associate = function(models) {
    Stat.belongsTo(models.Activity, {
      as: "Activity",
      foreignKey: "activityId"
    })
  }



  return Stat;
};
