const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transaction', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Mint','Sell','Cancel','Buy'),
      allowNull: true
    },
    token_id: {
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
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'user',
        key: 'wallet_address'
      }
    },
    offer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    seller: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'user',
        key: 'wallet_address'
      }
    }
  }, {
    sequelize,
    tableName: 'transaction',
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
      {
        name: "FK_transaction_user",
        using: "BTREE",
        fields: [
          { name: "buyer" },
        ]
      },
      {
        name: "FK_transaction_user_2",
        using: "BTREE",
        fields: [
          { name: "seller" },
        ]
      },
    ]
  });
};
