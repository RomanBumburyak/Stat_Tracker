'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    measurement: DataTypes.STRING
  }, {});

  Activity.associate = function(models) {
    Activity.hasMany(models.Stat, {
      as: "Stats",
      foreignKey: "activityId"
    })
  }


  return Activity;
};
