const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('marketplace', {
    offer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    token_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ticket',
        key: 'token_id'
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    seller: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'marketplace',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "offer_id" },
        ]
      },
      {
        name: "FK_marketplace_ticket",
        using: "BTREE",
        fields: [
          { name: "token_id" },
        ]
      },
    ]
  });
};
