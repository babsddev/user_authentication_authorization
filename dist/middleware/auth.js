"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRETE;
const users_1 = require("../models/users");
async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                Error: "Please sign in",
            });
        }
        const token = authorization?.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: "User not verified, access denied",
            });
        }
        const { id } = verified;
        const user = await users_1.UserInstance.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({
                Error: "User not verified",
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(403).json({
            Error: "User not logged in",
        });
        throw new Error(`${error}`);
    }
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map