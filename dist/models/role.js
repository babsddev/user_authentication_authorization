"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleInstance = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../dataBase/database"));
// export class RoleInstance extends Model<RoleAttributes> {}
exports.RoleInstance = database_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    junior: {
        type: sequelize_1.DataTypes.STRING,
    },
    midLevel: {
        type: sequelize_1.DataTypes.STRING,
    },
    senior: {
        type: sequelize_1.DataTypes.STRING,
    },
    userID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
//# sourceMappingURL=role.js.map