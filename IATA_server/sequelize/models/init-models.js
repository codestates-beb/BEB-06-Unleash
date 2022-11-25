const DataTypes = require("sequelize").DataTypes;
const _test = require("./test");
const _user = require("./user");
const _vc_list = require("./vclist");

function initModels(sequelize) {
  const test = _test(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);
  const vc_list = _vc_list(sequelize, DataTypes);

  user.hasMany(vc_list,{ as: "user_id", foreignKey: "user_id"})
  vc_list.belongsTo(user, { as: "user", foreignKey: "id"});


  return {
    test,
    user,
    vc_list
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
