const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('token_holder', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      },
      unique: "FK_token_holder_user"
    },
    token_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ticket',
        key: 'token_id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'token_holder',
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
        name: "user_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_token_holder_ticket",
        using: "BTREE",
        fields: [
          { name: "token_id" },
        ]
      },
    ]
  });
};
