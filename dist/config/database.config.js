"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('app', 'root', '12345678', {
    host: 'localhost',
    storage: './ideaLabDatabase.mysql',
    dialect: 'mysql',
    logging: false,
});
exports.default = db;
//# sourceMappingURL=database.config.js.map