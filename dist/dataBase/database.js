"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const myDatabase = new sequelize_1.Sequelize(`${process.env.DATABASE}`, `${process.env.DATABASE_USER}`, `${process.env.DATABASE_PASSWORD}`, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
exports.default = myDatabase;
//# sourceMappingURL=database.js.map