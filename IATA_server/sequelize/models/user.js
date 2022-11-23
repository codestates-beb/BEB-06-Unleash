const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
        type : DataTypes.STRING(100),
        allowNull : false,
        unique : true
    },
    password: {
        type : DataTypes.STRING(100),
        allowNull : false,
    },
    sure_name: {
        type : DataTypes.STRING(100),
        allowNull : false,
    },
    given_name: {
        type : DataTypes.STRING(100),
        allowNull : false,
    },
    nick_name: {
        type : DataTypes.STRING(100),
        allowNull : false,
    },
    national: {
        type : DataTypes.STRING(100),
        allowNull : false,
    },
    country_code: {
      type : DataTypes.STRING(100),
      allowNull : false,
    },
    phone_number: {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    phone_number: {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    wallet_address : {
        type : DataTypes.STRING(100),
        allowNull : false,
    },
    createdAt: {
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type : DataTypes.DATE,
      allowNull : true,
  },
  }, {
    sequelize,
    tableName: 'user',
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
