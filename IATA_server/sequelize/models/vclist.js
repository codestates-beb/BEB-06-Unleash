const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vc_list', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    did: {
        type : DataTypes.STRING(255),
        allowNull : false,
    },
    vc: {
      type : DataTypes.STRING(255),
      allowNull : false,
    },
  }, {
    sequelize,
    tableName: 'vc_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
