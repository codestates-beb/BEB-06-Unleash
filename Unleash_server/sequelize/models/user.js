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
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    wallet_address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    birth: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    ]
  });
};
