'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    measurement: DataTypes.INTEGER
  }, {});

  Activity.associate = function(models) {
    Activity.hasMany(models.Stat, {
      as: "Stat",
      foreignKey: "activityId"
    })
  }


  return Activity;
};
