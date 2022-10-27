"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../dataBase/database"));
const group_1 = require("./group");
const role_1 = require("./role");
// export class UserInstance extends Model<UserAttributes> {}
exports.UserInstance = database_1.default.define("User", {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "First name is required",
            },
            notEmpty: {
                msg: "First name cannot be empty",
            },
        },
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Last name is required",
            },
            notEmpty: {
                msg: "Last name cannot be empty",
            },
        },
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Username is required",
            },
            notEmpty: {
                msg: "Username cannot be empty",
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Email is required",
            },
            notEmpty: {
                msg: "Email cannot be empty",
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
            notEmpty: {
                msg: "Password cannot be empty",
            },
        },
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Phone number is required",
            },
            notEmpty: {
                msg: "Phone number cannot be empty",
            },
        },
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nG8OgXmMOXXiwbNOc-PPXUcilcIhCkS9BQ&usqp=CAU",
    },
    isVerified: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: false,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.UserInstance.hasMany(role_1.RoleInstance, { foreignKey: "userID", as: "Role" });
exports.UserInstance.hasMany(group_1.GroupInstance, {
    foreignKey: "userID",
    as: "Group",
});
role_1.RoleInstance.belongsTo(exports.UserInstance, { foreignKey: "userID", as: "User" });
group_1.GroupInstance.belongsTo(exports.UserInstance, {
    foreignKey: "userID",
    as: "User",
});
//# sourceMappingURL=users.js.map