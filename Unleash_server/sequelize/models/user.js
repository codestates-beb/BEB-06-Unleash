const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    sure_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    given_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nick_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    national: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    wallet_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "wallet_address"
    },
    birth: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    approve: {
      type: DataTypes.ENUM('true','false'),
      allowNull: true,
      defaultValue: "false"
    }
  }, {
    sequelize,
    tableName: 'user',
    hasTrigger: true,
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
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "wallet_address",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "wallet_address" },
        ]
      },
    ]
  });
};
