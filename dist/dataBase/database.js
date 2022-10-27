"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const myDatabase = new sequelize_1.Sequelize('ideaLabDatabase', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
exports.default = myDatabase;
//# sourceMappingURL=database.js.map