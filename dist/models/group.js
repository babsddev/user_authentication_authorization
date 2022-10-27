"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupInstance = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../dataBase/database"));
// export class GroupInstance extends Model<DroupAttributes> {}
exports.GroupInstance = database_1.default.define("UserGroup", {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    account: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "none",
    },
    engineering: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "none",
    },
    humanResource: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "none",
    },
    userID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
//# sourceMappingURL=group.js.map