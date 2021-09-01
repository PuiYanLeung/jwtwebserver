const { DataTypes } = require("sequelize");
const { connection } = require("../db");

const User = connection.define("User",{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash:{
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    membership: {
        type: DataTypes.STRING
    }
},{
    indexes: [{unique: true, fields: ['name']}]
});

module.exports = User;