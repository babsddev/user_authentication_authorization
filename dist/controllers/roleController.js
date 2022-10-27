"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.getRoleById = exports.getAllRoles = exports.createUserRole = void 0;
const uuid_1 = require("uuid");
const role_1 = require("../models/role");
async function createUserRole(req, res) {
    try {
        let newId = (0, uuid_1.v4)();
        const { junior, midLevel, senior } = req.body;
        const userID = req.user.id;
        const Role = await role_1.RoleInstance.create({
            id: newId,
            junior,
            midLevel,
            senior,
            userID,
        });
        return res.status(201).json({
            message: "Role created successfully",
            Role,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.createUserRole = createUserRole;
async function getAllRoles(req, res) {
    try {
        const Roles = await role_1.RoleInstance.findAll();
        return res.status(200).json({
            message: "Roles retrieved successfully",
            Roles,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.getAllRoles = getAllRoles;
async function getRoleById(req, res) {
    try {
        const { id } = req.params;
        const Role = await role_1.RoleInstance.findOne({ where: { id: id } });
        if (!Role) {
            return res.status(404).json({
                message: "Role not found",
            });
        }
        return res.status(200).json({
            message: "Role retrieved successfully",
            Role,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.getRoleById = getRoleById;
async function updateRole(req, res) {
    try {
        const { id } = req.params;
        const { junior, midLevel, senior } = req.body;
        const Role = await role_1.RoleInstance.findOne({ where: { id: id } });
        if (!Role) {
            return res.status(404).json({
                message: "Role not found",
            });
        }
        await role_1.RoleInstance.update({ junior, midLevel, senior }, { where: { id: id } });
        return res.status(200).json({
            message: "Role updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.updateRole = updateRole;
async function deleteRole(req, res) {
    try {
        const { id } = req.params;
        const Role = await role_1.RoleInstance.findOne({ where: { id: id } });
        if (!Role) {
            return res.status(404).json({
                message: "Role not found",
            });
        }
        await role_1.RoleInstance.destroy({ where: { id: id } });
        return res.status(200).json({
            message: "Role deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.deleteRole = deleteRole;
//# sourceMappingURL=roleController.js.map