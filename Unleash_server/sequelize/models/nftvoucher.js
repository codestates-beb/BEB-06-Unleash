const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nftvoucher', {
    token_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ticket',
        key: 'token_id'
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    totalsupply: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nftvoucher',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "token_id" },
        ]
      },
    ]
  });
};
