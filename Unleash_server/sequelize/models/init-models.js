var DataTypes = require("sequelize").DataTypes;
var _test = require("./test");

function initModels(sequelize) {
  var test = _test(sequelize, DataTypes);


  return {
    test,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
