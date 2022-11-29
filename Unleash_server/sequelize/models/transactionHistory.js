const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactionHistory', {
    id: {
      autoIncrement: true,
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
    offer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    buyer: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    seller: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'transactionHistory',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_transactionHistory_ticket",
        using: "BTREE",
        fields: [
          { name: "token_id" },
        ]
      },
    ]
  });
};
